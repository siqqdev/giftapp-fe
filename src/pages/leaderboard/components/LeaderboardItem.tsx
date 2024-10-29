import React from 'react';
import MockAvatar from '@/assets/mockAvatar.png'
import GiftIcon from '@/assets/icons/giftIcon.svg?react'

const LeaderboardItem = () => {
    return (
        <div className="flex flex-col gap-2 items-start">
            <div className="flex gap-4 items-center justify-between w-full">
                <div className='flex gap-4 items-center'>
                    <img
                        src={MockAvatar}
                        alt=""
                        className="w-14 h-14 bg-bg-secondary p-1 rounded-full"
                    />

                    <div className='flex flex-col items-start'>
                        <p className='font-semibold text-lg'>Alicia</p>
                        <span className='font-medium text-blue flex gap-2 items-center'>
                            10000 gifts
                            <GiftIcon className='w-4 h-4' />
                        </span>
                    </div>
                </div>

                <span className='text-xl'>
                    🥇
                </span>
            </div>
        </div>
    );
};

export default LeaderboardItem;