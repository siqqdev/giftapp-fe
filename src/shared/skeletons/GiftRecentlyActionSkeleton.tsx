import React from 'react';

const GiftRecentlyActionSkeleton = () => {
    return (
        <div className='flex gap-2 items-center'>
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"/>
                <div
                    className="absolute -bottom-0 -right-1 w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-600 border-2 border-white dark:border-bg-dark animate-pulse"/>
            </div>

            <div className='flex flex-col gap-1'>
                <div className='w-24 h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'/>
                <div className='w-48 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'/>
            </div>
        </div>
    );
};

export default GiftRecentlyActionSkeleton;