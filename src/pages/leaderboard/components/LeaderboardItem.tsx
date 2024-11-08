import React, { useRef, useEffect } from 'react';
import MockAvatar from '@/assets/mockAvatar.png';
import GiftIcon from '@/assets/icons/giftIcon.svg?react';
import { getPlaceEmoji } from "@/shared/consts.ts";
import {IUserWithTg} from "@/inerfaces/interfaces.ts";
import Avatar from "@/shared/ui/Avatar.tsx";
import {useGetUserTgInfoQuery} from "@/api/endpoints/userApi.ts";
import LeaderboardItemSkeleton from "@/shared/skeletons/LeaderboardItemSkeleton.tsx";
import {useDynamicTranslations} from "@/hooks/useDynamicTranslations.ts";

interface props {
    user: IUserWithTg
    onSelect: ({user: IUser, rect: DOMRect}) => void
}

const LeaderboardItem = ({ user, onSelect }: props) => {
    const {getGiftsWord} = useDynamicTranslations()
    const avatarRef = useRef<HTMLImageElement | null>(null);
    const {data: tgInfo, isLoading, isFetching} = useGetUserTgInfoQuery(user?.id);

    if (isLoading || isFetching) return <LeaderboardItemSkeleton />

    const handleClick = () => {
        if (avatarRef.current) {
            console.log('click')
            const rect = avatarRef.current.getBoundingClientRect();
            onSelect({
                user,
                tgInfo,
                rect
            });
        }
    };

    return (
        <div
            onClick={handleClick}
            className="flex flex-col gap-2 items-start text-black dark:text-white cursor-pointer"
        >
            <div className="flex gap-4 items-center justify-between w-full">
                <div className="flex gap-4 items-center">
                    <Avatar
                        firstName={tgInfo?.firstName}
                        lastName={tgInfo?.lastName}
                        file={tgInfo?.photosPath?.small || tgInfo?.photosPath?.small || ''}
                        ref={avatarRef}
                        className="w-14 h-14"
                    />
                    <div className="flex flex-col items-start">
                        <p className="font-semibold text-lg">{tgInfo?.firstName} {tgInfo?.lastName}</p>
                        <span className="font-medium text-blue flex gap-2 items-center">
                            {user?.giftsReceived} {getGiftsWord(user?.giftsReceived)}
                            <GiftIcon className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                <span className={`${user?.rank > 3 ? 'text-lg' : 'text-2xl'} text-center h-full text-label-secondary`}>
                    {getPlaceEmoji(user?.rank)}
                </span>
            </div>
        </div>
    );
};

export default React.memo(LeaderboardItem);