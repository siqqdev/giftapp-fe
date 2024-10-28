import React from 'react';
import GiftCard from "@/pages/store/components/GiftCard.tsx";

const GiftsList = () => {
    return (
        <div className='grid grid-cols-2 gap-4 w-full px-4 mt-4'>
            {Array.from({ length: 1 }).map((_, i) => (
                <GiftCard id={1}/>
            ))}
        </div>
    );
};

export default GiftsList;