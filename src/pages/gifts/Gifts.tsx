import React from 'react';
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";
import {useNavigate} from "react-router-dom";
import {useGetBoughtGiftsQuery, useGetGiftsQuery} from "@/api/endpoints/giftApi.ts";
import BoughtGiftsList from "@/pages/gifts/components/BoughtGiftsList.tsx";

const Gifts = () => {
    const {data: gifts, isLoading, isFetching} = useGetBoughtGiftsQuery()
    const navigate = useNavigate();
    const hasItems = gifts?.length > 0;

    return (
        <div className='flex flex-col gap-6 pt-10 px-4 text-black dark:text-white'>
            <div className='flex flex-col gap-2'>
                <p className='tracking-tighter font-semibold text-2xl text-center'>Send Gifts in Telegram</p>
                <p className='text-label-secondary text-center text-lg'>Send gifts to users that can be stored <br/> in their app profile.</p>
            </div>

            {!hasItems ? (
                <BalloonsPlaceholder className='bg-bg-secondary dark:bg-bg-dark-placeholder rounded-2xl py-6'>
                    <>
                        <p className='text-xl tracking-tighter text-center mt-1'>You dont have any gifts yet.</p>
                        <button className='text-blue px-4 py-2 tex-xl' onClick={() => navigate('/store')}>
                            Open Store
                        </button>
                    </>
                </BalloonsPlaceholder>
            ) : (
                <div className='pb-20'>
                    {/*<BoughtGiftsList gifts={gifts} />*/}
                </div>
            )}
        </div>
    );
};

export default Gifts;