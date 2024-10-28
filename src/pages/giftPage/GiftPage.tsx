import React from 'react';
import { useParams } from 'react-router-dom';
import TgPattern from "@/assets/tg-pattern.png";
import Cake from "@/assets/animations/gift-delicious-cake.json";
import Button from "@/shared/ui/Button.tsx";
import USDT from '@/assets/icons/currencies/filled/usdt.svg?react';
import AnimatedLottie from "@/shared/components/AnimatedLottie.tsx";

const GiftPage = () => {
    const { id } = useParams();

    return (
        <>
            <div className="w-full p-4">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                    <div className="absolute inset-0">
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{backgroundImage: `url(${TgPattern})`}}
                        />
                        <div
                            className="absolute inset-0 bg-opacity-10 bg-gradient-to-b from-accent-gold/20 to-accent-gold/5"
                        />
                    </div>

                    <div className="relative flex items-center justify-center w-full h-full">
                        <AnimatedLottie
                            layoutId={`gift-animation-${id}`}
                            animationData={Cake}
                            className="w-64 h-64"
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 px-4'>
                <p className='font-semibold text-2xl'>Delicious Cake</p>
                <p className='text-label-secondary text-lg tracking-normal'>
                    Purchase this gift for the opportunity to give it to another user.
                </p>
                <span className='flex gap-2 items-center'>
                    <USDT className='w-6 h-6' />
                    <p className='text-lg font-medium'>10 USDT</p>
                </span>
            </div>
        </>
    );
};

export default GiftPage;