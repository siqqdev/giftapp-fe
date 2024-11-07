import React from 'react';
import { motion } from 'framer-motion';
import Avatar from "@/shared/ui/Avatar.tsx";

interface props {
    file: string
    place: number
    firstName: string
    lastName: string
}

const ProfileAvatar = ({ file, place, firstName, lastName }: props) => (
    <motion.div
        variants={{
            initial: { width: '3.5rem', height: '3.5rem' },
            animate: { width: '7rem', height: '7rem' },
            exit: { width: '3.5rem', height: '3.5rem' }
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="will-change-transform"
    >
        <Avatar
            firstName={firstName}
            lastName={lastName}
            file={file}
            place={place}
            className="w-full h-full"
        />
    </motion.div>
);

export default React.memo(ProfileAvatar);