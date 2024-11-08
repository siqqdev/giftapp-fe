import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import useBackButton from "@/hooks/useBackButton.ts";
import Avatar from "@/shared/ui/Avatar.tsx";
import PremiumStar from '@/assets/icons/premiumStar.svg?react';
import ProfileGiftList from "@/pages/profile/components/ProfileGiftList.tsx";
import {ITgUser, IUser} from "@/inerfaces/interfaces.ts";
import {getGiftsWord} from "@/shared/utils.ts";
import {useDynamicTranslations} from "@/hooks/useDynamicTranslations.ts";
import {useTranslation} from "react-i18next";

const PortalBackground = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 bg-white dark:bg-bg-dark"
    />
);

const FlyingAvatar = ({ from, file, place, fn, ln }) => (
    <motion.div
        initial={{
            position: 'absolute',
            left: from.left,
            top: from.top,
            width: from.width,
            height: from.height,
            borderRadius: '50%',
            zIndex: 60,
        }}
        animate={{
            left: '50%',
            top: '1rem',
            width: '7rem',
            height: '7rem',
            x: '-50%',
            y: 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ willChange: 'transform' }}
    >
        <Avatar
            firstName={fn}
            lastName={ln}
            file={file}
            place={place}
            className="w-full h-full"
        />
    </motion.div>
);

const ProfileContent = ({ user, tgInfo }: {user: IUser, tgInfo: ITgUser}) => {
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

interface props {
    from: {
        left: string;
        top: string;
        width: string;
        height: string;
    };
    user: IUser;
    tgInfo: any;
    isClosing: boolean;
    onClose: () => void;
    onComplete: () => void;
}

const UserProfileModal = ({
                              from,
                              user,
                                tgInfo,
                              isClosing,
                              onClose,
                              onComplete,
                          }: props) => {
    const [hideBackButtonOnClose, setHideBackButtonOnClose] = useState(true);

    useBackButton({
        isModal: true,
        onModalClose: () => {
            setHideBackButtonOnClose(true);
            onClose();
        },
        hideOnClose: hideBackButtonOnClose
    });

    return createPortal(
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => isClosing && onComplete()}
            className="fixed inset-0 z-50 text-black dark:text-white overflow-y-auto bg-white dark:bg-bg-dark"
        >
            <PortalBackground />

            <div className="relative w-full h-full">
                <div className="h-28" />

                <FlyingAvatar
                    fn={tgInfo?.firstName}
                    ln={tgInfo?.lastName}
                    from={from}
                    file={tgInfo?.photosPath?.large || tgInfo?.photosPath?.small || ''}
                    place={user?.rank}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full pt-4"
                >
                    <ProfileContent user={user} tgInfo={tgInfo}/>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="px-2 w-full mt-4"
                    >
                        <ProfileGiftList id={user?.id} isProfile/>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>,
        document.body
    );
};

export default React.memo(UserProfileModal);