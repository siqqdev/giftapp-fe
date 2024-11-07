import React from 'react';
import Avatar from "@/shared/ui/Avatar.tsx";
import PremiumStar from '@/assets/icons/premiumStar.svg?react'
import MockAvatar from '@/assets/mockAvatar.png'
import ProfileGiftList from "@/pages/profile/components/ProfileGiftList.tsx";
import {AnimatePresence} from "framer-motion";
import ThemeSwitch from "@/pages/profile/components/ThemeSwitch.tsx";
import LanguageSwitch from "@/pages/profile/components/LanguageSwitch.tsx";
import Clock from '@/assets/icons/clock.svg?react';
import {useNavigate} from "react-router-dom";
import {useGetMeQuery} from "@/api/endpoints/userApi.ts";
import {getGiftsWord} from "@/shared/utils.ts";
import ProfileSkeleton from "@/shared/skeletons/ProfileSkeleton.tsx";

const Profile = () => {
    const navigate = useNavigate()
    const {data: user, isLoading, isFetching} = useGetMeQuery()

    if (isLoading || isFetching) return <ProfileSkeleton />

    return (
        <AnimatePresence>
            <div className='flex flex-col gap-4 items-center pt-4 pb-20 text-black dark:text-white'>
                <div className='relative w-full flex justify-center items-start'>
                    <div className='absolute left-4 top-0'>
                        <ThemeSwitch />
                    </div>

                    <Avatar
                        firstName={user?.telegram?.firstName}
                        lastName={user?.telegram?.lastName}
                        className='w-28 h-28'
                        file={user?.telegram?.photosPath?.large || user?.telegram?.photosPath?.small || ''}
                        place={1}/>

                    <div className='absolute right-4 top-0'>
                        <LanguageSwitch />
                    </div>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                    <div className='flex gap-2 items-center'>
                        <p className='text-2xl font-semibold'>{user?.telegram?.firstName} {user?.telegram?.lastName}</p>
                        {user?.telegram?.is_premium && <PremiumStar className='w-4 h-4'/>}
                    </div>
                    <p className='text-lg tracking-tighter text-label-secondary'>{user?.giftsReceived} {getGiftsWord(user?.giftsReceived)} received</p>
                    <button className='text-blue flex items-center gap-1 mt-2' onClick={() => navigate('/recent-actions')}>
                        <Clock className='w-4 h-4 font-medium' />
                        Recent Actions ›
                    </button>
                </div>

                <div className='px-2 w-full'>
                    <ProfileGiftList
                        id={user?.id}
                    />
                </div>
            </div>
        </AnimatePresence>
    );
};

export default Profile;