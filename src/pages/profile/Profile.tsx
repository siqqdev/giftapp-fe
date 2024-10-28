import React from 'react';
import Avatar from "@/shared/components/Avatar.tsx";
import PremiumStar from '@/assets/icons/premiumStar.svg?react'
import MockAvatar from '@/assets/mockAvatar.png'
import ProfileGiftList from "@/pages/profile/components/ProfileGiftList.tsx";
import {AnimatePresence} from "framer-motion";

const Profile = () => {
    return (
        <AnimatePresence>
            <div className='flex flex-col gap-4 justify-center items-center pt-10 pb-20'>
                <Avatar className='w-24 h-24' pfp={MockAvatar} place={1}/>
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <div className='flex gap-2 items-center'>
                        <p className='text-2xl font-semibold'>Alicia</p>
                        <PremiumStar className='w-4 h-4'/>
                    </div>
                    <p className='text-lg tracking-tighter text-label-secondary'>1000 gifts received</p>
                </div>
                <div className='px-2 w-full'>
                    <ProfileGiftList />
                </div>
            </div>
        </AnimatePresence>
    );
};

export default Profile;