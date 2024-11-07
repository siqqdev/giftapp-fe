import React from 'react';
import ProfileGiftCard from "@/shared/components/ProfileGiftCard.tsx";
import {useGetReceivedGiftsQuery} from "@/api/endpoints/giftApi.ts";
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";

interface props {
    id?: string
    isProfile: boolean
}

const ProfileGiftList = ({id, isProfile}: props) => {
    const {data: gifts, isLoading, isFetching} = useGetReceivedGiftsQuery(id, {skip: !id})

    if (gifts?.length === 0) return (
        <BalloonsPlaceholder>
            There are no received gifts here.
        </BalloonsPlaceholder>
    )
    return (
        <div className="grid grid-cols-3 gap-3 w-full">
            {gifts?.length > 0 && gifts.map((gift) => (
                <ProfileGiftCard
                    senderId={gift?.receivedBy?.id}
                    gift={gift}
                    isProfile={isProfile}
                />
            ))}
        </div>
    );
};

export default ProfileGiftList;