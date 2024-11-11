import React from 'react';
import {ITgUser, IUser} from "@/inerfaces/interfaces.ts";
import {useTranslation} from "react-i18next";
import {useDynamicTranslations} from "@/hooks/useDynamicTranslations.ts";
import {motion} from "framer-motion";
import PremiumStar from '@/assets/icons/premiumStar.svg?react';

interface props {
    user: IUser,
    tgInfo: ITgUser
}

const ProfileContent = ({ user, tgInfo }: props) => {
    const {t} = useTranslation()
    const {getGiftsWord} = useDynamicTranslations()
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-1 items-center justify-center"
        >
            <div className="flex gap-2 items-center mt-4">
                <p className="text-2xl font-semibold">{tgInfo?.firstName} {tgInfo?.lastName}</p>
                {tgInfo?.isPremium && <PremiumStar className="w-4 h-4"/>}
            </div>
            <p className="text-lg tracking-tighter text-label-secondary">
                {user?.giftsReceived} {getGiftsWord(user?.giftsReceived)} {t('received')}
            </p>
        </motion.div>
    )
}

export default ProfileContent;