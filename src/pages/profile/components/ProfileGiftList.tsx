import React from 'react';
import ProfileGiftCard from "@/shared/components/ProfileGiftCard.tsx";
import {useGetReceivedGiftsQuery} from "@/api/endpoints/giftApi.ts";
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";
import GiftItemSkeleton from "@/shared/skeletons/GiftItemSkeleton.tsx";

interface props {
    id?: string
    isProfile: boolean
}

const ProfileGiftList = ({id, isProfile}: props) => {
    const {data: gifts, isLoading} = useGetReceivedGiftsQuery(id, {
        refetchOnArgChange: true,
        skip: !id
    })

    if (gifts?.length === 0) return (
        <BalloonsPlaceholder>
            There are no received gifts here.
        </BalloonsPlaceholder>
    )

    if (isLoading) return (
        <div className="grid grid-cols-3 gap-3 w-full">
            {[1, 2, 3, 4, 5, 6].map((_) => (
                <GiftItemSkeleton />
            ))}
        </div>
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