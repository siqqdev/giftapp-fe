import React from 'react';
import GiftCard from "@/pages/store/components/GiftCard.tsx";
import {giftsMockData} from "@/shared/consts.ts";

interface GiftsListProps {
    onSelectGift: (gift: any) => void;
}

const GiftsList = ({ onSelectGift }: GiftsListProps) => {
    return (
        <div className='grid grid-cols-2 w-full px-4 mt-4 gap-2'>
            {giftsMockData.map((gift) => (
                <GiftCard
                    key={gift.id}
                    {...gift}
                    onSelect={onSelectGift}
                />
            ))}
        </div>
    );
};

export default GiftsList;