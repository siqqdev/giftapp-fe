import React from 'react';

const GiftItemSkeleton = () => {
    return (
        <div className="w-auto rounded-2xl bg-bg-secondary dark:bg-bg-dark-placeholder p-3">
            <div className="relative flex flex-col items-center">
                <div
                    className="absolute left-0 top-0 flex items-center gap-1 rounded-full px-2 py-1 justify-between w-full">
                    <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"/>
                    <div className="w-16 h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"/>
                </div>

                <div className="relative flex h-16 w-20 items-center justify-center mt-10">
                    <div className="absolute h-20 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-700 animate-pulse"/>
                </div>

                <div className="w-full text-center mt-1 h-14 flex items-end justify-center pb-1">
                    <div className="w-24 h-6 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"/>
                </div>
            </div>
        </div>
    );
};

export default GiftItemSkeleton;