import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import TgPattern from "@/assets/tg-pattern.png";
import {TransparentCurrencyIcon, getGiftById, gradientClassNames, FilledCurrencyIcon} from "@/shared/consts.ts";
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";

const GiftPage = () => {
    const { id } = useParams();
    const gift = getGiftById(Number(id));

    if (!gift) return null;

    const Icon = FilledCurrencyIcon[gift.currency];

    return (
        <>
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
                            layoutId={`gift-animation-${gift.id}`}
                            animationData={gift.animationData}
                            className="w-64 h-64"
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 px-4'>
                <p className='font-semibold text-2xl'>{gift.name}</p>
                {gift.description && (
                    <p className='text-label-secondary text-lg tracking-normal'>
                        {gift.description}
                    </p>
                )}
                <span className='flex gap-2 items-center'>
                    <Icon className='w-6 h-6' />
                    <p className='text-lg font-medium'>{gift.price} {gift.currency}</p>
                </span>
            </div>
        </>
    );
};

export default GiftPage;