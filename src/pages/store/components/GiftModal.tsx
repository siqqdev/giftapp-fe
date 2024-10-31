import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import classNames from 'classnames';
import TgPattern from "@/assets/tg-pattern.png";
import { FilledCurrencyIcon, gradientClassNames } from "@/shared/consts.ts";
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import RecentlyActionsList from "@/pages/giftPage/components/RecentlyActionsList.tsx";
import useBackButton from "@/hooks/useBackButton.ts";
import {useAppDispatch} from "@/store/hooks.ts";
import {setTabBarVisibility} from "@/store/slices/tabBarSlice.ts";

interface GiftModalProps {
    gift: {
        id: number;
        animationData: string;
        color: string;
        name: string;
        price: number;
        currency: string;
    };
    onClose: () => void;
    closePage: () => void;
}

const GiftModal = ({ gift, onClose, closePage }: GiftModalProps) => {
    useBackButton({
        isModal: true,
        onModalClose: closePage
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

    return (
        <div
            className="fixed inset-0 bg-white z-50"
        >
            <div
                className='h-full overflow-auto'
                onClick={e => e.stopPropagation()}
            >
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
                            <AnimatedLottie
                                animationData={gift.animationData}
                                className="w-64 h-64"
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-1 px-4'>
                    <p className='font-semibold text-2xl'>{gift.name}</p>
                    <p className='text-label-secondary tracking-normal'>
                        Purchase this gift for the opportunity to give it to another user.
                    </p>
                    <span className='flex gap-2 items-center mt-2'>
                        {(() => {
                            const Icon = FilledCurrencyIcon[gift.currency];
                            return <Icon className='w-6 h-6'/>;
                        })()}
                        <p className='text-lg font-medium'>{gift.price} {gift.currency}</p>
                    </span>

                    <RecentlyActionsList/>
                </div>
            </div>
        </div>
    );
};

export default GiftModal;