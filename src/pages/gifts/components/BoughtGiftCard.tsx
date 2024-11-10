import React, {useState} from 'react';
import Cake from '@/assets/gifts/delicious-cake.png'
import Button from "@/shared/ui/Button.tsx";
import GiftDrawer from "@/shared/components/GiftDrawer.tsx";
import {IBoughtGift} from "@/inerfaces/interfaces.ts";
import {formatDate, getGiftImage} from "@/shared/utils.ts";
import {useSendGiftMutation} from "@/api/endpoints/giftApi.ts";
import {useTranslation} from "react-i18next";

interface props {
    gift: IBoughtGift
}

const BoughtGiftCard = ({gift}: props) => {
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [sendGiftReq] = useSendGiftMutation()

    const handleSendGift = async () => {
        if (isProcessing) return;

        try {
            setIsProcessing(true);
            const res = await sendGiftReq(gift?._id).unwrap();

            setIsOpen(false);

            setTimeout(() => {
                window.Telegram.WebApp.switchInlineQuery(res?.hash, ['users']);
            }, 100);

        } catch (error) {
            console.error('Error sending gift:', error);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <>
            <div
                className='flex flex-col gap-2 px-2 py-4 bg-bg-secondary dark:bg-bg-dark-placeholder rounded-2xl w-auto justify-center items-center cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <p className='text-label-secondary text-sm tracking-wide'>{gift?.name}</p>
                <img src={getGiftImage(gift?.name)} alt="" className='w-20 h-20'/>
                <Button className='px-6 capitalize'>
                    {t('send')}
                </Button>
            </div>

            <GiftDrawer
                isProfile={false}
                giftName={gift?.name}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                date={formatDate(gift?.purchaseDate)}
                callback={handleSendGift}
                price={gift?.gift?.price}
                receivedAmount={gift?.gift?.soldAmount}
                user={gift?.user}
                asset={gift?.gift?.asset}
            />
        </>
    );
};

export default BoughtGiftCard;