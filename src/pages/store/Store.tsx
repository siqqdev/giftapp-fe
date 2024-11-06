import React, { useState, useCallback } from 'react';
import GiftIcon from '@/assets/icons/tabbar/gifts.svg?react'
import GiftsList from "@/pages/store/components/GiftsList.tsx";
import { AnimatePresence } from "framer-motion";
import { setTabBarVisibility } from "@/store/slices/tabBarSlice.ts";
import { useAppDispatch } from "@/store/hooks.ts";
import GiftModal from "@/pages/store/components/giftModal/GiftModal.tsx";
import {useGetGiftsQuery} from "@/api/endpoints/giftApi.ts";
import {IGift} from "@/inerfaces/interfaces.ts";

const Store = () => {
    const {data: gifts, isLoading, isFetching} = useGetGiftsQuery()
    const dispatch = useAppDispatch();
    const [selectedGift, setSelectedGift] = useState<{ gift: IGift; rect: DOMRect }>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleSelectGift = (gift) => {
        dispatch(setTabBarVisibility(false));
        setSelectedGift(gift);
        setIsClosing(false);
    };

    const closeModal = useCallback(() => {
        setSelectedGift(null);
        setIsClosing(false);
        dispatch(setTabBarVisibility(true));
    }, [dispatch]);

    return (
        <div className='flex flex-col gap-3 justify-center items-center pt-10 pb-28 text-black dark:text-white'>
            <GiftIcon className='fill-blue w-12 h-12' />
            <p className='font-semibold text-center text-2xl tracking-tighter'>Buy and Send Gifts</p>
            <p className='text-label-secondary'>Unique gifts for everyone by Crypto Pay.</p>
            <GiftsList onSelectGift={handleSelectGift} gifts={gifts}/>
            <AnimatePresence mode="wait">
                {selectedGift && (
                    <GiftModal
                        from={selectedGift.rect}
                        onComplete={() => {
                            if (isClosing) {
                                setSelectedGift(null);
                                setIsClosing(false);
                                dispatch(setTabBarVisibility(true));
                            }
                        }}
                        gift={selectedGift.gift}
                        isClosing={isClosing}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Store;