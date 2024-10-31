import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import TgPattern from "@/assets/tg-pattern.png";
import { FilledCurrencyIcon, gradientClassNames } from "@/shared/consts.ts";
import RecentlyActionsList from "@/pages/giftPage/components/RecentlyActionsList.tsx";
import useBackButton from "@/hooks/useBackButton.ts";
import classNames from 'classnames';
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import {IGift} from "@/inerfaces/interfaces.ts";

interface GiftPortalProps {
    from: DOMRect;
    onComplete: () => void;
    gift: IGift;
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
        <AnimatePresence mode='popLayout'>
            <div className="fixed inset-0 z-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className="absolute inset-0 bg-white will-change-opacity"
                    style={{
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitPerspective: 1000,
                        WebkitTransform: 'translateZ(0)',
                    }}
                />

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
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className="absolute z-51 will-change-transform"
                    style={{
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitPerspective: 1000,
                    }}
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
                                        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
                                        style={{
                                            backgroundImage: `url(${TgPattern})`,
                                            WebkitBackfaceVisibility: 'hidden',
                                            WebkitPerspective: 1000,
                                            WebkitTransform: 'translateZ(0)',
                                        }}
                                    />
                                    <div
                                        className={classNames(
                                            'absolute inset-0 bg-opacity-10',
                                            gradientClassNames[gift.color]
                                        )}
                                        style={{
                                            WebkitBackfaceVisibility: 'hidden',
                                            WebkitTransform: 'translateZ(0)',
                                        }}
                                    />
                                </div>

                                <div className="relative flex items-center justify-center w-full h-full">
                                    <motion.div
                                        variants={{
                                            initial: {
                                                width: '9rem',
                                                height: '9rem',
                                                scale: 1
                                            },
                                            animate: {
                                                width: '16rem',
                                                height: '16rem',
                                                scale: 1
                                            },
                                            exit: {
                                                width: '9rem',
                                                height: '9rem',
                                                scale: 1
                                            }
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.4, 0, 0.2, 1]
                                        }}
                                        className="will-change-transform"
                                        style={{
                                            WebkitBackfaceVisibility: 'hidden',
                                            WebkitPerspective: 1000,
                                            WebkitTransform: 'translateZ(0)',
                                        }}
                                    >
                                        <AnimatedLottie
                                            name={gift.animationName}
                                            className="w-full h-full"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(10px)',
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            exit={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(10px)',
                            }}
                            transition={{
                                duration: 0.7,
                                delay: isClosing ? 0 : 0.2,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className="flex flex-col gap-1 px-4 pb-4 will-change-transform"
                            style={{
                                WebkitBackfaceVisibility: 'hidden',
                                WebkitPerspective: 1000,
                                WebkitTransform: 'translateZ(0)',
                            }}
                        >
                            <p className="font-semibold text-2xl">{gift.name}</p>
                            <p className="text-label-secondary tracking-normal">
                                Purchase this gift for the opportunity to give it to another user.
                            </p>
                            <span className="flex gap-2 items-center mt-2">
                                <CurrencyIcon className="w-6 h-6"/>
                                <p className="text-lg font-medium">{gift.price} {gift.currency}</p>
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