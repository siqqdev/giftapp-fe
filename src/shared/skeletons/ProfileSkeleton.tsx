import React from 'react';

const ProfileSkeleton = () => {
    return (
        <div className='flex flex-col gap-4 items-center pt-4 pb-20'>
            <div className='relative w-full flex justify-center items-start'>
                <div className='absolute left-4 top-0'>
                    <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                </div>

                <div className='w-28 h-28 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse' />

                <div className='absolute right-4 top-0'>
                    <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                </div>
            </div>

            <div className='flex flex-col gap-1 items-center justify-center'>
                <div className='flex gap-2 items-center'>
                    <div className='h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse' />
                    <div className='w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse' />
                </div>

                <div className='h-6 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse mt-1' />

                <div className='h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse mt-2' />
            </div>

            <div className='px-2 w-full'>
                <div className="flex flex-col gap-3">
                    <div className="h-8 w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />

                    {Array(3).fill(null).map((_, index) => (
                        <div
                            key={index}
                            className="h-20 w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;