import React, { useRef, useEffect } from 'react';
import MockAvatar from '@/assets/mockAvatar.png';
import GiftIcon from '@/assets/icons/giftIcon.svg?react';
import { getPlaceEmoji } from "@/shared/consts.ts";

const LeaderboardItem = ({ name, amount, place, onSelect }) => {
    const avatarRef = useRef<HTMLImageElement>(null);

    const handleClick = () => {
        if (avatarRef.current) {
            const rect = avatarRef.current.getBoundingClientRect();
            onSelect({
                name,
                amount,
                place,
                pfp: MockAvatar,
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
                    <img
                        ref={avatarRef}
                        src={MockAvatar}
                        alt=""
                        className="w-14 h-14 p-1 rounded-full"
                    />
                    <div className="flex flex-col items-start">
                        <p className="font-semibold text-lg">{name}</p>
                        <span className="font-medium text-blue flex gap-2 items-center">
                            {amount} gifts
                            <GiftIcon className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                <span className={`${place > 3 ? 'text-lg' : 'text-2xl'} text-center h-full text-label-secondary`}>
                    {getPlaceEmoji(place)}
                </span>
            </div>
        </div>
    );
};

export default React.memo(LeaderboardItem);