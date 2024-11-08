import React from 'react';

const ActionHistoryItemSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 items-start">
            <div className="flex gap-4 items-center justify-between w-full">
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
                        <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
                    </div>
                </div>

                <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
            </div>
        </div>
    );
};

const RecentActionsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 pt-10 px-4 pb-4">
            <div className="flex flex-col gap-4">
                <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse mx-auto" />
                <div className="h-6 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse mx-auto" />
            </div>

            {[...Array(2)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex flex-col gap-2">
                    <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
                    <div className="flex flex-col gap-4">
                        {[...Array(3)].map((_, itemIndex) => (
                            <ActionHistoryItemSkeleton key={itemIndex} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export { ActionHistoryItemSkeleton, RecentActionsSkeleton };