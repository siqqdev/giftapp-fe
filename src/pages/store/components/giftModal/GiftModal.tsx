import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { IGift } from "@/inerfaces/interfaces.ts";
import useBackButton from "@/hooks/useBackButton.ts";
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import Background from './Background';
import PortalBackground from './PortalBackground';
import GiftAnimation from './GiftAnimation';
import GiftInfo from './GiftInfo';

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
    const navigate = useNavigate();
    const [hideBackButtonOnClose, setHideBackButtonOnClose] = useState(true);

    useBackButton({
        isModal: true,
        onModalClose: () => {
            setHideBackButtonOnClose(true);
            onClose();
        },
        hideOnClose: hideBackButtonOnClose
    });

    const handleBuyClick = () => {
        setHideBackButtonOnClose(false);
        onClose();
        navigate('/gift-bought-success');
    };

    const { show, hide } = useTelegramButton({
        initialParams: {
            text: 'Buy a Gift',
            color: '#007AFF',
        },
        onClick: handleBuyClick,
    });

    useEffect(() => {
        show();
        return () => hide();
    }, [show, hide]);

    return createPortal(
        <AnimatePresence mode='popLayout'>
            <div className="fixed inset-0 z-50 text-black dark:text-white overflow-y-scroll bg-white dark:bg-bg-dark">
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
                        },
                        exit: {
                            transform: `translate3d(${from.left}px, ${from.top}px, 0)`,
                            width: from.width,
                            height: from.height,
                        }
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute z-51"
                    onAnimationComplete={() => isClosing && onComplete()}
                >
                    <div className="w-full h-full">
                        <div className="w-full p-4">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                                <Background color={gift.color} />
                                <div className="relative flex items-center justify-center w-full h-full">
                                    <GiftAnimation animationData={gift.animationData} />
                                </div>
                            </div>
                        </div>
                        <GiftInfo gift={gift} isClosing={isClosing} />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default React.memo(GiftModal);