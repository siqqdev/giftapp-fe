import React, {useState} from 'react';
import Cake from '@/assets/gifts/delicious-cake.png'
import Button from "@/shared/ui/Button.tsx";
import GiftDrawer from "@/pages/gifts/components/GiftDrawer.tsx";

const BoughtGiftCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const giftData = {
        name: 'Delicious Cake',
        image: Cake
    };

    return (
        <>
            <div
                className='flex flex-col gap-2 px-2 py-4 bg-bg-secondary dark:bg-bg-dark-placeholder rounded-2xl w-auto justify-center items-center cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <p className='text-label-secondary text-sm tracking-wide'>Delicious Cake</p>
                <img src={Cake} alt="" className='w-20 h-20'/>
                <Button className='px-6'>
                    Send
                </Button>
            </div>

            <GiftDrawer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                giftData={giftData}
            />
        </>
    );
};

export default BoughtGiftCard;