import React from 'react';
import MockAvatar from "@/assets/mockAvatar.png";
import Bought from '@/assets/icons/actions/bought.svg?react'

const RecentlyActionItem = () => {
    return (
        <div className='flex gap-2 items-center'>
            <div className="relative">
                <img
                    src={MockAvatar}
                    alt=""
                    className="w-12 h-12 p-1 rounded-full"
                />
                <span
                    className={`absolute -bottom-0 -right-1 bg-blue rounded-full p-1 border-2 border-white dark:border-bg-dark`}>
                            {<Bought className="w-2.5 h-2.5"/>}
                            </span>
            </div>

            <div className='flex flex-col'>
                <p className='text-label-secondary text-xs'>Buy Gift</p>
                <p className='font-medium'>Aicia bought a Gift</p>
            </div>
        </div>
    );
};

export default RecentlyActionItem;