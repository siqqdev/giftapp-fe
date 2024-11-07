import React, {useEffect, useState} from 'react';
import SuccessGift from '@/assets/animations/effect-gift-purchased.json';
import Cake from '@/assets/animations/gift-delicious-cake.json';
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import useNotification from "@/hooks/useNotification.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useReceiveGiftMutation, useSendGiftMutation} from "@/api/endpoints/giftApi.ts";

const ReceiveGiftSuccess = () => {
    const {id} = useParams()
    const [receiveGift] = useReceiveGiftMutation()
    const [gift, setGift] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const decodedId = decodeURIComponent(id);
                const res = await receiveGift(decodedId).unwrap();
                console.log('Received gift response:', res);
                setGift(res);
            } catch (error) {
                console.error('Error receiving gift:', error);
            }
        })();
    }, []);

    const navigate = useNavigate();

    const mainButton = useTelegramButton({
        type: 'main',
        initialParams: {
            text: 'Open Profile',
            color: '#007AFF',
            textColor: 'white',
        },
        onClick: () => {
            navigate('/profile')
        }
    });

    const { showNotification, NotificationComponent } = useNotification({
        onClose: () => {
            navigate('/profile')
        }
    });

    useEffect(() => {
        mainButton.show();
        showNotification("Gift Received", `${gift?.name} from ${gift?.receivedBy?.firstLastName}`, 'View', gift?.name);

        return () => {
            mainButton.hide();
        };
    }, [gift]);

    return (
        <>
            <div className='flex flex-col h-screen justify-center items-center gap-2 text-black dark:text-white'>
                <div className="relative w-60 h-60">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatedLottie
                            animationName={gift?.name}
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
                    <p className='font-semibold text-2xl text-center'>Gift Received</p>
                    <p className='font-medium text-center text-md'>You have received the gift {gift?.name}</p>
                </div>
            </div>
            <NotificationComponent />
        </>
    );
};

export default ReceiveGiftSuccess;