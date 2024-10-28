import React from 'react';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import TgPattern from '@/assets/tg-pattern.png';
import Button from "@/shared/ui/Button.tsx";
import {TransparentCurrencyIcon, gradientClassNames} from "@/shared/consts.ts";
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";

interface Props {
    id: number;
    animationData: string;
    color: 'gold' | 'red' | 'green' | 'blue';
    name: string;
    price: number;
    currency: 'TON' | 'USDT' | 'ETH';
    amount: number;
}

const GiftCard = ({ id, animationData, color, name, price, currency, amount }: Props) => {
    const navigate = useNavigate();
    const Icon = TransparentCurrencyIcon[currency];

    return (
        <div className="relative w-full overflow-hidden rounded-2xl py-8" onClick={() => navigate(`/product/${id}`)}>
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${TgPattern})` }}
                />
                <div className={classNames(
                    'absolute inset-0 bg-opacity-10',
                    gradientClassNames[color]
                )}/>
            </div>

            <div className="absolute top-4 right-4 text-black font-medium opacity-50 tracking-tighter">
                {amount} of 500
            </div>

            <div className='relative flex flex-col gap-3 justify-center items-center w-full rounded-xl'>
                <AnimatedLottie
                    layoutId={`gift-animation-${id}`}
                    animationData={animationData}
                    className='w-36 h-36'
                />
                <p className='font-bold text-center text-lg'>{name}</p>
                <Button>
                    <Icon className='w-4 h-4' />
                    {price} {currency}
                </Button>
            </div>
        </div>
    );
};

export default GiftCard;