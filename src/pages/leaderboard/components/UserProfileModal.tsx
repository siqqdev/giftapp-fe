import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import useBackButton from "@/hooks/useBackButton.ts";
import Avatar from "@/shared/ui/Avatar.tsx";
import PremiumStar from '@/assets/icons/premiumStar.svg?react';
import ProfileGiftList from "@/pages/profile/components/ProfileGiftList.tsx";

const PortalBackground = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 bg-white dark:bg-bg-dark"
    />
);

const FlyingAvatar = ({ from, pfp, place }) => (
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
            pfp={pfp}
            place={place}
            className="w-full h-full"
        />
    </motion.div>
);

const ProfileContent = ({ userData }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-1 items-center justify-center"
    >
        <div className="flex gap-2 items-center mt-4">
            <p className="text-2xl font-semibold">{userData.name}</p>
            <PremiumStar className="w-4 h-4"/>
        </div>
        <p className="text-lg tracking-tighter text-label-secondary">
            {userData.amount} gifts received
        </p>
    </motion.div>
);

const UserProfileModal = ({
                              from,
                              userData,
                              isClosing,
                              onClose,
                              onComplete,
                          }) => {
    const navigate = useNavigate();
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
                    from={from}
                    pfp={userData.pfp}
                    place={userData.place}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full pt-4"
                >
                    <ProfileContent userData={userData} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="px-2 w-full mt-4"
                    >
                        <ProfileGiftList />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>,
        document.body
    );
};

export default React.memo(UserProfileModal);