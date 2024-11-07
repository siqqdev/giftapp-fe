import React, { useEffect } from 'react';
import SuccessGift from '@/assets/animations/effect-gift-purchased.json';
import Cake from '@/assets/animations/gift-delicious-cake.json';
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import useNotification from "@/hooks/useNotification.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useSendGiftMutation} from "@/api/endpoints/giftApi.ts";

const BuyGiftSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gift = location.state?.gift;
    console.log( gift)
    const [sendGiftReq] = useSendGiftMutation()
    const handleSendGift = async () => {
        const res = await sendGiftReq(gift?._id).unwrap()
        console.log(res)
        window.Telegram.WebApp.switchInlineQuery(res?.hash, ['users'])
    }

    const mainButton = useTelegramButton({
        type: 'main',
        initialParams: {
            text: 'Send Gift',
            color: '#007AFF',
            textColor: 'white',
        },
        onClick: () => {
            handleSendGift()
        }
    });

    const secondaryButton = useTelegramButton({
        type: 'secondary',
        initialParams: {
            text: 'Open Store',
            textColor: '#007AFF',
        },
        onClick: () => {
            navigate('/store')
        }
    });

    const { showNotification, NotificationComponent } = useNotification({
        onClose: () => {
            handleSendGift()
        }
    });

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
            <div className='flex flex-col h-screen justify-center items-center gap-2 text-black dark:text-white'>
                <div className="relative w-60 h-60">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatedLottie
                            animationName={gift?.gift?.name}
                            className='w-24 h-24 z-0'
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatedLottie
                            animationName='effect-gift-purchased'
                            className='w-48 h-48 z-10'
                            loop={false}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 -mt-16'>
                    <p className='font-semibold text-2xl text-center'>Gift Purchased</p>
                    <p className='font-medium text-center text-md'>The {gift?.gift?.name} gift was purchased <br/> for {gift?.gift?.price} {gift?.gift?.asset}.</p>
                </div>
            </div>
            <NotificationComponent />
        </>
    );
};

export default BuyGiftSuccess;