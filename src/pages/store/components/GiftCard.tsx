import React from 'react';
import classNames from 'classnames';
import TgPattern from '@/assets/tg-pattern.png';
import Button from "@/shared/ui/Button.tsx";
import {TransparentCurrencyIcon, gradientClassNames} from "@/shared/consts.ts";
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";
import {motion, useReducedMotion} from 'framer-motion'
import {useAppDispatch} from "@/store/hooks.ts";
import {setTabBarVisibility} from "@/store/slices/tabBarSlice.ts";

interface Props {
    id: number;
    animationData: string;
    color: 'gold' | 'red' | 'green' | 'blue';
    name: string;
    price: number;
    currency: 'TON' | 'USDT' | 'ETH';
    amount: number;
    onSelect: (gift: Omit<Props, 'onSelect'>) => void;
}


const GiftCard = ({ id, animationData, color, name, price, currency, amount, onSelect }: GiftCardProps) => {
    const dispatch = useAppDispatch();
    const Icon = TransparentCurrencyIcon[currency];
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            dispatch(setTabBarVisibility(false));
            onSelect({
                id,
                animationData,
                color,
                name,
                price,
                currency,
                amount,
                rect
            });
        }
    };

    return (
        <div
            ref={cardRef}
            className="relative w-full overflow-hidden rounded-2xl py-8 cursor-pointer"
            onClick={handleClick}
        >
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

            <div className='relative flex flex-col gap-3 justify-center items-center w-full rounded-xl'>
                <AnimatedLottie
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