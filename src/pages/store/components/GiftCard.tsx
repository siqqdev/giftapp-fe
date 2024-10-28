import React from 'react';
import { useNavigate } from "react-router-dom";
import Cake from '@/assets/animations/gift-delicious-cake.json';
import Ton from '@/assets/icons/currencies/transparent/ton.svg?react';
import TgPattern from '@/assets/tg-pattern.png';
import Button from "@/shared/ui/Button.tsx";
import AnimatedLottie from "@/shared/components/AnimatedLottie.tsx";

const GiftCard = ({ id }) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full overflow-hidden rounded-2xl py-8" onClick={() => navigate(`/product/${id}`)}>
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${TgPattern})` }}
                />
                <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-b from-accent-gold/20 to-accent-gold/5"/>
            </div>

            <div className="absolute top-4 right-4 text-accent-orange font-medium opacity-50 tracking-tighter">
                3 of 500
            </div>

            <div className='relative flex flex-col gap-3 justify-center items-center w-full rounded-xl'>
                <AnimatedLottie
                    layoutId={`gift-animation-${id}`}
                    animationData={Cake}
                    className='w-36 h-36'
                />
                <p className='font-bold text-center text-lg'>Delicious Cake</p>
                <Button>
                    <Ton className='w-4 h-4' />
                    10 USDT
                </Button>
            </div>
        </div>
    );
};

export default GiftCard;