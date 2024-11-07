import React from 'react';
import ProfileGiftCard from "@/shared/components/ProfileGiftCard.tsx";
import Cake from '@/assets/gifts/delicious-cake.png';
import GreenStar from '@/assets/gifts/green-star.png';
import BlueStar from '@/assets/gifts/blue-star.png';
import RedStar from '@/assets/gifts/red-star.png';
import MockAvatar from '@/assets/mockAvatar.png';
import {useGetReceivedGiftsQuery} from "@/api/endpoints/giftApi.ts";
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";

const mockGifts = [
    {
        id: 1,
        avatar: MockAvatar,
        amountMin: 2,
        amountMax: 5,
        img: Cake,
        name: "Birthday Cake"
    },
    {
        id: 2,
        avatar: MockAvatar,
        amountMin: 1,
        amountMax: 3,
        img: GreenStar,
        name: "Green Star"
    },
    {
        id: 3,
        avatar: MockAvatar,
        amountMin: 4,
        amountMax: 10,
        img: BlueStar,
        name: "Blue Star"
    },
    {
        id: 4,
        avatar: MockAvatar,
        amountMin: 0,
        amountMax: 7,
        img: RedStar,
        name: "Red Star"
    },
    {
        id: 5,
        avatar: MockAvatar,
        amountMin: 3,
        amountMax: 6,
        img: Cake,
        name: "Special Cake"
    },
    {
        id: 6,
        avatar: MockAvatar,
        amountMin: 2,
        amountMax: 4,
        img: GreenStar,
        name: "Lucky Star"
    },
    {
        id: 7,
        avatar: MockAvatar,
        amountMin: 5,
        amountMax: 8,
        img: BlueStar,
        name: "Magic Star"
    },
    {
        id: 8,
        avatar: MockAvatar,
        amountMin: 1,
        amountMax: 5,
        img: RedStar,
        name: "Power Star"
    },
    {
        id: 9,
        avatar: MockAvatar,
        amountMin: 2,
        amountMax: 6,
        img: Cake,
        name: "Party Cake"
    },
    {
        id: 10,
        avatar: MockAvatar,
        amountMin: 3,
        amountMax: 7,
        img: GreenStar,
        name: "Wish Star"
    }
];

const ProfileGiftList = ({id}: {id: string}) => {
    const {data: gifts, isLoading, isFetching} = useGetReceivedGiftsQuery(id)
    console.log(gifts)

    if (gifts?.length === 0) return (
        <BalloonsPlaceholder>
            There are no received gifts here.
        </BalloonsPlaceholder>
    )
    return (
        <div className="grid grid-cols-3 gap-3 w-full">
            {gifts?.length > 0 && gifts.map((gift) => (
                <ProfileGiftCard
                    senderId={gift?.sendedBy?.id}
                    gift={gift?.gift}
                />
            ))}
        </div>
    );
};

export default ProfileGiftList;