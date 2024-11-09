import React from 'react';
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";
import {useNavigate} from "react-router-dom";
import {useGetBoughtGiftsQuery, useGetGiftsQuery} from "@/api/endpoints/giftApi.ts";
import BoughtGiftsList from "@/pages/gifts/components/BoughtGiftsList.tsx";
import {useTranslation} from "react-i18next";
import GiftItemSkeleton from "@/shared/skeletons/GiftItemSkeleton.tsx";
import BoughtGiftSkeleton from "@/shared/skeletons/BoughtGiftSkeleton.tsx";

const Gifts = () => {
    const {t} = useTranslation()
    const {data: gifts, isLoading} = useGetBoughtGiftsQuery()
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-6 pt-10 px-4 text-black dark:text-white pb-20'>
            <div className='flex flex-col gap-2'>
                <p className='tracking-tighter font-semibold text-2xl text-center'>{t('giftsPage.title')}</p>
                <p className='text-label-secondary text-center text-lg mx-8'>{t('giftsPage.description')}</p>
            </div>

            {isLoading && (
                <div className='grid grid-cols-3 gap-2'>
                    {Array.from({length: 6}).map((_) => (
                        <BoughtGiftSkeleton />
                    ))}
                </div>
            )}

            {!isLoading && gifts?.length === 0 ? (
                <BalloonsPlaceholder className='bg-bg-secondary dark:bg-bg-dark-placeholder rounded-2xl py-6'>
                <>
                        <p className='text-xl tracking-tighter text-center mt-1'>{t('placeholder.giftsPage')}</p>
                        <button className='text-blue px-4 py-2 tex-xl capitalize' onClick={() => navigate('/store')}>
                            {t('openStore')}
                        </button>
                    </>
                </BalloonsPlaceholder>
            ) : (
                <div>
                    <BoughtGiftsList gifts={gifts} />
                </div>
            )}
        </div>
    );
};

export default Gifts;