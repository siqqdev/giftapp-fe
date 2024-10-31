import React, { useEffect } from 'react';
import SuccessGift from '@/assets/animations/effect-gift-purchased.json';
import Cake from '@/assets/animations/gift-delicious-cake.json';
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import useNotification from "@/hooks/useNotification.tsx";

const BuyGiftSuccess = () => {
    const mainButton = useTelegramButton({
        type: 'main',
        onClick: () => {
        }
    });

    const secondaryButton = useTelegramButton({
        type: 'secondary',
        onClick: () => {
        }
    });

    const { showNotification, NotificationComponent } = useNotification();

    useEffect(() => {
        mainButton.show();
        secondaryButton.show();
        showNotification("Gift Purchased", "Now send it tou your friend");

        return () => {
            mainButton.hide();
            secondaryButton.hide();
        };
    }, []);

    return (
        <>
            <div className='flex flex-col h-screen justify-center items-center gap-2'>
                <div className="relative w-60 h-60 flex items-center justify-center">
                    <AnimatedLottie layoutId={543} animationData={Cake} className='w-24 h-24 z-0'/>
                    <AnimatedLottie
                        layoutId={432}
                        animationData={SuccessGift}
                        className='absolute w-60 h-60 z-10'
                    />
                </div>
                <div className='flex flex-col gap-2 -mt-16'>
                    <p className='font-semibold text-2xl text-center'>Gift Purchased</p>
                    <p className='font-medium text-center text-md'>The Delicious Cake gift was purchased <br/> for 10 USDT.</p>
                </div>
            </div>
            <NotificationComponent />
        </>
    );
};

export default BuyGiftSuccess;