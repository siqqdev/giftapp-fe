import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import useBackButton from "@/hooks/useBackButton.ts";
import ProfileGiftList from "@/pages/profile/components/ProfileGiftList.tsx";
import {IUser} from "@/inerfaces/interfaces.ts";
import PortalBackground from "@/pages/leaderboard/components/PortalBackground.tsx";
import FlyingAvatar from "@/pages/leaderboard/components/FlyingAvatar.tsx";
import ProfileContent from "@/pages/leaderboard/components/ProfileContent.tsx";

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