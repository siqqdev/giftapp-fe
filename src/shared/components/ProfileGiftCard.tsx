import React, {useState} from 'react';
import Avatar from "@/shared/ui/Avatar.tsx";
import {IGift, IReceivedGift} from "@/inerfaces/interfaces.ts";
import {useGetUserTgInfoQuery} from "@/api/endpoints/userApi.ts";
import {formatDate, getGiftImage} from "@/shared/utils.ts";
import GiftDrawer from "@/shared/components/GiftDrawer.tsx";
import GiftCardSkeleton from "@/shared/skeletons/GiftCardSkeleton.tsx";
import GiftItemSkeleton from "@/shared/skeletons/GiftItemSkeleton.tsx";

interface props {
    senderId: string;
    gift: IReceivedGift;
    isProfile: boolean;
}

const ProfileGiftCard = ({senderId, gift, isProfile}: props) => {
    const {data: userTgInfo, isLoading} = useGetUserTgInfoQuery(senderId);
    const [isOpen, setIsOpen] = useState(false);

    if (isLoading) return <GiftItemSkeleton />

    return (
        <>
            <div className="w-auto rounded-2xl bg-bg-secondary dark:bg-bg-dark-placeholder p-3" onClick={() => setIsOpen(true)}>
                <div className="relative flex flex-col items-center">
                    <div
                        className="absolute left-0 top-0 flex items-center gap-1 rounded-full px-2 py-1 justify-between w-full">
                        <Avatar
                            firstName={userTgInfo?.firstName}
                            lastName={userTgInfo?.lastName}
                            file={userTgInfo?.photosPath?.small || userTgInfo?.photosPath?.large || ''}
                            className="h-6 w-6"
                        />
                        <span className="text-xs text-label-secondary">{gift?.gift?.soldAmount} of {gift?.totalAmount}</span>
                    </div>

                    <div className="relative flex h-16 w-20 items-center justify-center mt-10">
                        <div className="absolute h-20 w-20 rounded-lg"/>
                        <img src={getGiftImage(gift?.name)} alt="" className="object-contain"/>
                    </div>

                    <div className="w-full text-center mt-1 h-14 flex items-end justify-center pb-1">
                        <span className="text-lg font-medium leading-none">{gift?.name}</span>
                    </div>
                </div>
            </div>

            <GiftDrawer
                user={userTgInfo}
                giftName={gift?.name!}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                date={formatDate(gift?.receivedDate)}
                callback={() => setIsOpen(false)}
                price={gift?.gift?.price}
                receivedAmount={gift?.totalAmount}
                asset={gift?.gift?.asset}
                isProfile={isProfile}
            />
        </>
    );
};

export default ProfileGiftCard;