import React from 'react';

const GiftCardSkeleton = () => {
    return (
        <div className="relative w-full overflow-hidden rounded-2xl py-8 bg-gray-100 dark:bg-gray-800 h-72">
            <div className="absolute top-4 right-4 w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>

            <div className="flex justify-center mb-2">
                <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="flex justify-center">
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
        </div>
    );
};

export default GiftCardSkeleton;