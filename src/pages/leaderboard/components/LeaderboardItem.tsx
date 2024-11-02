import React from 'react';
import MockAvatar from '@/assets/mockAvatar.png'
import GiftIcon from '@/assets/icons/giftIcon.svg?react'
import {getPlaceEmoji} from "@/shared/consts.ts";

const LeaderboardItem = ({name, amount, place}) => {
    return (
        <div className="flex flex-col gap-2 items-start text-black dark:text-white">
            <div className="flex gap-4 items-center justify-between w-full">
                <div className='flex gap-4 items-center'>
                    <img
                        src={MockAvatar}
                        alt=""
                        className="w-14 h-14 p-1 rounded-full"
                    />

                    <div className='flex flex-col items-start'>
                        <p className='font-semibold text-lg'>{name}</p>
                        <span className='font-medium text-blue flex gap-2 items-center'>
                            {amount} gifts
                            <GiftIcon className='w-4 h-4' />
                        </span>
                    </div>
                </div>

                <span className={`${place > 3 ? 'text-lg' : 'text-2xl'} text-center h-full mt-2 text-label-secondary`}>
                  {getPlaceEmoji(place)}
                </span>
            </div>
        </div>
    );
};

export default LeaderboardItem;