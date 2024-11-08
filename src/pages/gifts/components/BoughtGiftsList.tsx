import React from 'react';
import BoughtGiftCard from "@/pages/gifts/components/BoughtGiftCard.tsx";
import {IBoughtGift} from "@/inerfaces/interfaces.ts";

interface props {
    gifts: IBoughtGift[]
}

const BoughtGiftsList = ({ gifts }: props) => {
    return (
        <div className='grid grid-cols-3 gap-2'>
            {gifts?.map((gift: any) => (
                <BoughtGiftCard
                    gift={gift}
                />
            ))}
        </div>
    );
};

export default BoughtGiftsList;