import React from 'react';
import RecentlyActionItem from "@/pages/store/components/giftModal/RecentlyActionItem.tsx";
import {useGetGiftActionsQuery} from "@/api/endpoints/giftApi.ts";
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";
import {useTranslation} from "react-i18next";
import GiftRecentlyActionSkeleton from "@/shared/skeletons/GiftRecentlyActionSkeleton.tsx";

interface props {
    id: string
}

const RecentlyActionsList = ({id}: props) => {
    const {t} = useTranslation()
    const {data: giftActions, isLoading, isFetching} = useGetGiftActionsQuery(id);

    if (isLoading) return (
        <div className='flex flex-col mt-2 gap-2'>
            {Array.from({length: 6}).map((_) => (
                <GiftRecentlyActionSkeleton />
            ))}
        </div>
    )

    return (
        <div className='bg-white dark:bg-bg-dark mt-4 pt-4 text-black dark:text-white'>
            <p className='text-label-secondary text-xs font-medium uppercase'>{t('recentlyActions')}</p>

            <div className='flex flex-col mt-2 gap-2'>
                {giftActions?.items?.length > 0 ? (
                    giftActions.items.map((action) => (
                        <RecentlyActionItem
                            action={action}
                        />
                    ))
                ) : (
                    <BalloonsPlaceholder>
                        {t('placeholder.recentActions')}
                    </BalloonsPlaceholder>
                )}
            </div>
        </div>
    );
};

export default RecentlyActionsList;