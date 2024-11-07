import React from 'react';
import Avatar from "@/shared/ui/Avatar.tsx";
import {IGift} from "@/inerfaces/interfaces.ts";
import {useGetUserTgInfoQuery} from "@/api/endpoints/userApi.ts";
import {getGiftImage} from "@/shared/utils.ts";

interface props {
    senderId: string;
    gift: IGift;
}

const ProfileGiftCard = ({senderId, gift}: props) => {
    console.log(senderId, gift)
    const {data: userTgInfo} = useGetUserTgInfoQuery(senderId);
    return (
        <div className="w-auto rounded-2xl bg-bg-secondary dark:bg-bg-dark-placeholder p-3">
            <div className="relative flex flex-col items-center">
                <div className="absolute left-0 top-0 flex items-center gap-1 rounded-full px-2 py-1 justify-between w-full">
                    <Avatar
                        firstName={userTgInfo?.firstName}
                        lastName={userTgInfo?.lastName}
                        file={userTgInfo?.photosPath?.small || userTgInfo?.photosPath?.large || ''}
                        className="h-6 w-6"
                    />
                    <span className="text-xs text-label-secondary">{gift?.soldAmount} of {gift?.totalAmount}</span>
                </div>

                <div className="relative flex h-16 w-20 items-center justify-center mt-10">
                    <div className="absolute h-20 w-20 rounded-lg" />
                    <img src={getGiftImage(gift?.name)} alt="" className="object-contain"/>
                </div>

                <div className="w-full text-center mt-1 h-14 flex items-end justify-center pb-1">
                    <span className="text-lg font-medium leading-none">{gift?.name}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileGiftCard;