import React from 'react';
import BoughtGiftCard from "@/pages/gifts/components/BoughtGiftCard.tsx";

const BoughtGiftsList = () => {
    return (
        <div className='grid grid-cols-3 gap-2'>
            <BoughtGiftCard />
            <BoughtGiftCard />
            <BoughtGiftCard />
            <BoughtGiftCard />
            <BoughtGiftCard />
            <BoughtGiftCard />
            <BoughtGiftCard />
        </div>
    );
};

export default BoughtGiftsList;