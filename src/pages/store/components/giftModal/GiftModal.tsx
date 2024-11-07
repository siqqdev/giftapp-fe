import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { IGift } from "@/inerfaces/interfaces.ts";
import useBackButton from "@/hooks/useBackButton.ts";
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import Background from './Background';
import PortalBackground from './PortalBackground';
import GiftAnimation from './GiftAnimation';
import GiftInfo from './GiftInfo';
import {useBuyGiftMutation, useCheckGiftPaymentMutation, useGetGiftActionsQuery} from "@/api/endpoints/giftApi.ts";

interface GiftPortalProps {
    from: DOMRect;
    onComplete: () => void;
    gift: IGift;
    isClosing: boolean;
    onClose: () => void;
}

const GiftModal = ({
                       from,
                       onComplete,
                       gift,
                       isClosing,
                       onClose,
                   }: GiftPortalProps) => {
    const [buyGiftReq] = useBuyGiftMutation()
    const [checkGiftPaymentReq] = useCheckGiftPaymentMutation()
    const navigate = useNavigate();
    const [hideBackButtonOnClose, setHideBackButtonOnClose] = useState(true);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

    const success = (gift) => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        onClose();
        setHideBackButtonOnClose(false);
        navigate('/gift-bought-success', {state: {gift}});
    }

    const handleBuyClick = async () => {
        try {
            const res = await buyGiftReq(gift?._id).unwrap()
            const id = res?._id

            const newInterval = setInterval(async () => {
                try {
                    const paymentResult = await checkGiftPaymentReq(id).unwrap()

                    if (paymentResult && paymentResult._id) {
                        clearInterval(newInterval);
                        setIntervalId(null);
                        success(paymentResult);
                        return;
                    }
                } catch (error) {
                    console.log('Payment check failed, will retry in 1 second:', error);
                }
            }, 1000);

            setIntervalId(newInterval);

            setTimeout(() => {
                if (intervalId === newInterval) {
                    clearInterval(newInterval);
                    setIntervalId(null);
                    window.Telegram?.WebApp.showAlert('Payment check timeout reached. Please check your payment status in the profile.');
                }
            }, 60000);

            window.Telegram?.WebApp.openTelegramLink(res?.invoice?.miniAppInvoiceUrl);
        } catch (error) {
            console.error('Error in handleBuyClick:', error);
            window.Telegram?.WebApp.showAlert('Error processing payment. Please try again.');
        }
    };

    const { show, hide } = useTelegramButton({
        initialParams: {
            text: 'Buy a Gift',
            color: '#007AFF',
        },
        onClick: handleBuyClick,
    });

    useEffect(() => {
        if (isButtonVisible) {
            show();
        } else {
            hide();
        }
    }, [isButtonVisible, show, hide]);

    useBackButton({
        isModal: true,
        onModalClose: () => {
            setIsButtonVisible(false);
            setHideBackButtonOnClose(true);
            onClose();
        },
        hideOnClose: hideBackButtonOnClose
    });

    return createPortal(
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 text-black dark:text-white overflow-y-scroll bg-white dark:bg-bg-dark"
        >
            <PortalBackground />
            <motion.div
                variants={{
                    initial: {
                        transform: `translate3d(${from.left}px, ${from.top}px, 0)`,
                        width: from.width,
                        height: from.height,
                    },
                    animate: {
                        transform: 'translate3d(0, 0, 0)',
                        width: '100%',
                        height: '100vh',
                    }
                }}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute z-51"
                onAnimationComplete={() => isClosing && onComplete()}
            >
                <div className="w-full h-full">
                    <div className="w-full p-4">
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                            <Background name={gift.name} />
                            <div className="relative flex items-center justify-center w-full h-full">
                                <GiftAnimation animationName={gift.name} />
                            </div>
                        </div>
                    </div>
                    <GiftInfo gift={gift} isClosing={isClosing} />
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

export default React.memo(GiftModal);