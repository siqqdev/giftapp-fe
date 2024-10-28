import React from 'react';
import GiftIcon from '@/assets/icons/tabbar/gifts.svg?react'
import GiftsList from "@/pages/store/components/GiftsList.tsx";

const Store = () => {
    return (
        <div className='flex flex-col gap-3 justify-center items-center pt-10'>
            <GiftIcon className='fill-blue w-12 h-12' />
            <p className='font-semibold text-center text-2xl tracking-tighter'>Buy and Send Gifts</p>
            <p className='text-label-secondary'>Unique gifts for everyone by Crypto Pay.</p>
            <GiftsList/>
        </div>
    );
};

export default Store;