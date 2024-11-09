import React from 'react';

const BoughtGiftSkeleton = () => {
    return (
        <div
            className='flex flex-col gap-2 px-2 py-4 bg-bg-secondary dark:bg-bg-dark-placeholder rounded-2xl w-auto justify-center items-center'>
            <div className='w-24 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'/>

            <div className='w-20 h-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse'/>

            <div className='w-24 h-9 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse'/>
        </div>
    );
};

export default BoughtGiftSkeleton;