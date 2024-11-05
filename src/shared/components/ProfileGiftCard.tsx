import React from 'react';
import Avatar from "@/shared/ui/Avatar.tsx";

interface props {
    avatar: string
    amountMin: number
    amountMax: number
    img: string
    name: string
}

const ProfileGiftCard = ({avatar, amountMin, amountMax, img, name}: props) => {
    return (
        <div className="w-auto rounded-2xl bg-bg-secondary dark:bg-bg-dark-placeholder p-3">
            <div className="relative flex flex-col items-center">
                <div className="absolute left-0 top-0 flex items-center gap-1 rounded-full px-2 py-1 justify-between w-full">
                    <Avatar
                        pfp={avatar}
                        className="h-6 w-6"
                    />
                    <span className="text-xs text-label-secondary">{amountMin} of {amountMax}</span>
                </div>

                <div className="relative flex h-16 w-20 items-center justify-center mt-10">
                    <div className="absolute h-20 w-20 rounded-lg" />
                    <img src={img} alt="" className="object-contain"/>
                </div>

                <div className="w-full text-center mt-1 h-14 flex items-end justify-center pb-1">
                    <span className="text-lg font-medium leading-none">{name}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileGiftCard;