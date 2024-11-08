import React, {useState} from 'react';
import Cake from '@/assets/gifts/delicious-cake.png'
import Button from "@/shared/ui/Button.tsx";
import GiftDrawer from "@/shared/components/GiftDrawer.tsx";
import {IBoughtGift} from "@/inerfaces/interfaces.ts";
import {getGiftImage} from "@/shared/utils.ts";
import {useSendGiftMutation} from "@/api/endpoints/giftApi.ts";

interface props {
    gift: IBoughtGift
}

const BoughtGiftCard = ({gift}: props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sendGiftReq] = useSendGiftMutation()

    const handleSendGift = async () => {
        const res = await sendGiftReq(gift?._id).unwrap()
        window.Telegram.WebApp.switchInlineQuery(res?.hash, ['users'])
    }

    return (
        <>
            <div
                className='flex flex-col gap-2 px-2 py-4 bg-bg-secondary dark:bg-bg-dark-placeholder rounded-2xl w-auto justify-center items-center cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <p className='text-label-secondary text-sm tracking-wide'>{gift?.name}</p>
                <img src={getGiftImage(gift?.name)} alt="" className='w-20 h-20'/>
                <Button className='px-6'>
                    Send
                </Button>
            </div>

            {/*<GiftDrawer*/}
            {/*    giftName={gift?.name}*/}
            {/*    isOpen={isOpen}*/}
            {/*    onClose={() => setIsOpen(false)}*/}
            {/*    date={gift?.purchaseDate}*/}
            {/*    callback={handleSendGift}*/}
            {/*    price={}*/}
            {/*    receivedAmount={}*/}
            {/*    user={}*/}
            {/*    asset={}*/}
            {/*/>*/}
        </>
    );
};

export default BoughtGiftCard;