import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import classNames from 'classnames';
import TgPattern from "@/assets/tg-pattern.png";
import {TransparentCurrencyIcon, getGiftById, gradientClassNames, FilledCurrencyIcon} from "@/shared/consts.ts";
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";
import {useTelegramButton} from "@/hooks/useTelegramButton.ts";
import RecentlyActionsList from "@/pages/giftPage/components/RecentlyActionsList.tsx";
import {SVGProps} from "@/inerfaces/interfaces.ts";

const GiftPage = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const gift = getGiftById(Number(id));

    if (!gift) return null;

    const Icon = FilledCurrencyIcon[gift.currency] as React.FC<SVGProps>;

    const handleBuyGift = () => {
        navigate('/gift-bought-success')
    }

    const { show, hide, setParams } = useTelegramButton({
        initialParams: {
            text: 'Buy a Gift',
            color: '#007AFF',
        },
        onClick: handleBuyGift,
    });

    useEffect(() => {
        setTimeout(() => {
            show()
            return () => hide()
        },170)
    }, [])

    return (
        <div className='bg-bg-secondary'>
            <div className="w-full p-4 bg-white">
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
                            animationName='gift-delicious-cake'
                            className="w-64 h-64"
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-1 px-4 mb-4 bg-white pb-2'>
                <p className='font-semibold text-2xl'>{gift.name}</p>
                <p className='text-label-secondary tracking-normal'>
                    Purchase this gift for the opportunity to <br/> give it to another user.
                </p>
                <span className='flex gap-2 items-center mt-2'>
                    <Icon className='w-6 h-6' />
                    <p className='text-lg font-medium'>{gift.price} {gift.currency}</p>
                </span>
            </div>
            <RecentlyActionsList />
        </div>
    );
};

export default GiftPage;