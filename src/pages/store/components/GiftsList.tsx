import React from 'react';
import GiftCard from "@/pages/store/components/giftCard/GiftCard.tsx";
import {IGift} from "@/inerfaces/interfaces.ts";
import GiftCardSkeleton from "@/shared/skeletons/GiftCardSkeleton.tsx";

interface GiftsListProps {
    onSelectGift: ({gift: IGift, rect: DOMRect}) => void;
    gifts: IGift[];
    isLoading?: boolean;
}

const GiftsList = ({ onSelectGift, gifts, isLoading }: GiftsListProps) => {
    if (isLoading) {
        return (
            <div className='grid grid-cols-2 w-full px-4 mt-4 gap-2'>
                {[...Array(4)].map((_, index) => (
                    <GiftCardSkeleton />
                ))}
            </div>
        );
    }

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