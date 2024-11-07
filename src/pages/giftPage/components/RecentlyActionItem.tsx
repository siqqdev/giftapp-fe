import React from 'react';
import MockAvatar from "@/assets/mockAvatar.png";
import Bought from '@/assets/icons/actions/bought.svg?react'
import {IGiftAction, SVGProps} from "@/inerfaces/interfaces.ts";
import Avatar from "@/shared/ui/Avatar.tsx";
import {useGetUserByIdQuery} from "@/api/endpoints/userApi.ts";
import {getActionColor, getActionIcon, getActionText, getActionWord} from "@/shared/utils.ts";

interface props {
    action: IGiftAction
}

const RecentlyActionItem = ({action}: props) => {
    const {data: user} = useGetUserByIdQuery(action?.user?.id, {
        skip: !action?.user
    })

    const Icon = getActionIcon(action?.type) as React.FC<SVGProps>

    return (
        <div className='flex gap-2 items-center'>
            <div className="relative">
                <Avatar
                    lastName={user?.telegram?.lastName}
                    firstName={user?.telegram?.firstName}
                    file={user?.telegram?.photosPath?.small || user?.telegram?.photosPath?.large || ''}
                    className="w-12 h-12 p-1"
                />
                <span className={`absolute -bottom-0 -right-1 ${getActionColor(action?.type)} rounded-full p-1 border-2 border-white dark:border-bg-dark`}>
                    {<Icon className="w-2.5 h-2.5"/>}
                </span>
            </div>

            <div className='flex flex-col'>
                <p className='text-label-secondary text-xs'>{getActionText(action?.type)}</p>
                <p className='font-medium'>{user?.telegram?.firstName} {user?.telegram?.lastName} {getActionWord(action?.type)} a Gift</p>
            </div>
        </div>
    );
};

export default RecentlyActionItem;