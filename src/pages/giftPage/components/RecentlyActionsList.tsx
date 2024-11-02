import React from 'react';
import RecentlyActionItem from "@/pages/giftPage/components/RecentlyActionItem.tsx";

const RecentlyActionsList = () => {
    return (
        <div className='bg-white dark:bg-bg-dark mt-4 pt-4 text-black dark:text-white'>
            <p className='text-label-secondary text-xs font-medium'>RECENTLY ACTIONS</p>

            <div className='flex flex-col mt-2 gap-2'>
                <RecentlyActionItem />
                <RecentlyActionItem />
                <RecentlyActionItem />
                <RecentlyActionItem />
                <RecentlyActionItem />
                <RecentlyActionItem />
                <RecentlyActionItem />
                <RecentlyActionItem />
                <RecentlyActionItem />
            </div>
        </div>
    );
};

export default RecentlyActionsList;