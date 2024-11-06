import React from 'react';
import GiftCard from "@/pages/store/components/giftCard/GiftCard.tsx";
import { giftsMockData } from "@/shared/consts.ts";
import {IGift} from "@/inerfaces/interfaces.ts";

interface GiftsListProps {
    onSelectGift: ({gift: IGift, rect: DOMRect}) => void;
    gifts: IGift[]
}

const GiftsList = ({ onSelectGift, gifts }: GiftsListProps) => {
    return (
        <div className='grid grid-cols-2 w-full px-4 mt-4 gap-2'>
            {gifts?.map((gift) => (
                <GiftCard
                    gift={gift}
                    onSelect={onSelectGift}
                />
            ))}
        </div>
    );
};

export default GiftsList;