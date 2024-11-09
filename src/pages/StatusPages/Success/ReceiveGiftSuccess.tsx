import React, {useEffect, useState} from 'react';
import SuccessGift from '@/assets/animations/effect-gift-purchased.json';
import Cake from '@/assets/animations/gift-delicious-cake.json';
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import { useTelegramButton } from "@/hooks/useTelegramButton.ts";
import useNotification from "@/hooks/useNotification.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useReceiveGiftMutation, useSendGiftMutation} from "@/api/endpoints/giftApi.ts";
import {useTranslation} from "react-i18next";
import {useGetMeQuery} from "@/api/endpoints/userApi.ts";
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";

const ReceiveGiftSuccess = () => {
    const {t} = useTranslation();
    const {data: user} = useGetMeQuery()
    const {id} = useParams();
    const [receiveGift] = useReceiveGiftMutation();
    const [gift, setGift] = useState(null);
    const [isAlreadyReceived, setIsAlreadyReceived] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const navigate = useNavigate();

    const mainButton = useTelegramButton({
        type: 'main',
        initialParams: {
            text: t('receiveSuccess.button'),
            color: '#007AFF',
            textColor: 'white',
        },
        onClick: () => {
            navigate('/profile');
        }
    });

    const { showNotification, NotificationComponent } = useNotification({
        onClose: () => {
            navigate('/profile');
        }
    });

    useEffect(() => {
        const fetchGift = async () => {
            if (requestSent) return;

            setRequestSent(true);
            try {
                const decodedId = decodeURIComponent(id);
                const res = await receiveGift(decodedId).unwrap();
                console.log('Received gift response:', res);
                setGift(res);
                setIsAlreadyReceived(false);
            } catch (error) {
                setIsAlreadyReceived(true);
            }
        };

        fetchGift();
    }, [id]);

    useEffect(() => {
        if (gift) {
            mainButton.show();
            showNotification(
                t('receiveSuccess.giftReceived'),
                `${gift?.name} ${t('from')} ${gift?.receivedBy?.firstLastName}`,
                t('view'),
                gift?.name
            );
        }

        return () => {
            mainButton.hide();
        };
    }, [gift]);

    if (isAlreadyReceived) return (
        <div className='h-screen flex justify-center items-center'>
            <BalloonsPlaceholder>
                <p>{t('alreadyReceived.title')}</p>
                <button className='text-cyan' onClick={() => navigate('/store')}>{t('alreadyReceived.button')}</button>
            </BalloonsPlaceholder>
        </div>
    )

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
                    <p className='font-semibold text-2xl text-center'>{t('receiveSuccess.giftReceived')}</p>
                    <p className='font-medium text-center text-md'>{t('receiveSuccess.purchaseInfo')} {gift?.name}</p>
                </div>
            </div>
            <NotificationComponent />
        </>
    );
};

export default ReceiveGiftSuccess;