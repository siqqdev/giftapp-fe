import React from 'react';
import {motion} from "framer-motion";
import Avatar from "@/shared/ui/Avatar.tsx";

interface props {
    from: {
        left: string;
        top: string;
        width: string;
    };
    file: string;
    place: number;
    fn: string;
    ln: string;
}

const FlyingAvatar = ({ from, file, place, fn, ln }: props) => (
    <motion.div
        initial={{
            position: 'absolute',
            left: from.left,
            top: from.top,
            width: from.width,
            height: from.width,
            borderRadius: '50%',
            zIndex: 60,
            aspectRatio: '1 / 1',
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
        style={{
            willChange: 'transform',
            aspectRatio: '1 / 1',
        }}
    >
        <Avatar
            firstName={fn}
            lastName={ln}
            file={file}
            place={place}
            className="w-full h-full aspect-square"
        />
    </motion.div>
);

export default FlyingAvatar;