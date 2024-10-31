import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import TgPattern from "@/assets/tg-pattern.png";
import { FilledCurrencyIcon, gradientClassNames } from "@/shared/consts.ts";
import RecentlyActionsList from "@/pages/giftPage/components/RecentlyActionsList.tsx";
import useBackButton from "@/hooks/useBackButton.ts";
import classNames from 'classnames';
import {useTelegramButton} from "@/hooks/useTelegramButton.ts";

interface GiftPortalProps {
    from: DOMRect;
    onComplete: () => void;
    gift: {
        id: number;
        animationData: string;
        color: string;
        name: string;
        price: number;
        currency: string;
    };
    isClosing: boolean;
    onClose: () => void;
}

const GiftPortal = ({
                        from,
                        onComplete,
                        gift,
                        isClosing,
                        onClose,
                    }: GiftPortalProps) => {
    const CurrencyIcon = FilledCurrencyIcon[gift.currency];

    useBackButton({
        isModal: true,
        onModalClose: onClose
    });

    const handleBuyGift = () => {
    }

    const { show, hide } = useTelegramButton({
        initialParams: {
            text: 'Buy a Gift',
            color: '#007AFF',
        },
        onClick: handleBuyGift,
    });

    useEffect(() => {
        show();
        return () => hide();
    }, []);

    return createPortal(
        <AnimatePresence mode="wait">
            <div className="fixed inset-0 z-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white"
                />

                <motion.div
                    variants={{
                        initial: {
                            position: 'absolute',
                            top: from.top,
                            left: from.left,
                            width: from.width,
                            height: from.height,
                            zIndex: 51
                        },
                        animate: {
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh'
                        },
                        exit: {
                            top: from.top,
                            left: from.left,
                            width: from.width,
                            height: from.height,
                        }
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onAnimationComplete={() => {
                        if (isClosing) {
                            onComplete();
                        }
                    }}
                >
                    <div className="w-full h-full overflow-y-auto">
                        <div className="w-full p-4">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                                <div className="absolute inset-0">
                                    <div
                                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                                        style={{backgroundImage: `url(${TgPattern})`}}
                                    />
                                    <div className={classNames(
                                        'absolute inset-0 bg-opacity-10',
                                        gradientClassNames[gift.color]
                                    )}/>
                                </div>

                                <div className="relative flex items-center justify-center w-full h-full">
                                    <motion.div
                                        variants={{
                                            initial: { width: '9rem', height: '9rem' },
                                            animate: { width: '16rem', height: '16rem' },
                                            exit: { width: '9rem', height: '9rem' }
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <AnimatedLottie
                                            animationData={gift.animationData}
                                            className="w-full h-full"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 20 },
                                animate: { opacity: 1, y: 0 },
                                exit: { opacity: 0, y: 20 }
                            }}
                            transition={{ duration: 0.2, delay: isClosing ? 0 : 0.2 }}
                            className='flex flex-col gap-1 px-4 pb-4'
                        >
                            <p className='font-semibold text-2xl'>{gift.name}</p>
                            <p className='text-label-secondary tracking-normal'>
                                Purchase this gift for the opportunity to give it to another user.
                            </p>
                            <span className='flex gap-2 items-center mt-2'>
                                <CurrencyIcon className='w-6 h-6'/>
                                <p className='text-lg font-medium'>{gift.price} {gift.currency}</p>
                            </span>

                            <RecentlyActionsList/>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default GiftPortal;