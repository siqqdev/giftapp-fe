import React from 'react';
import { motion } from 'framer-motion';
import { FilledCurrencyIcon } from "@/shared/consts.ts";
import RecentlyActionsList from "@/pages/giftPage/components/RecentlyActionsList.tsx";
import { IGift } from "@/inerfaces/interfaces.ts";

interface GiftInfoProps {
    gift: IGift;
    isClosing: boolean;
}

const GiftInfo = ({ gift, isClosing }: GiftInfoProps) => {
    const CurrencyIcon = FilledCurrencyIcon[gift.currency];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            transition={{
                duration: 0.7,
                delay: isClosing ? 0 : 0.2,
                ease: [0.4, 0, 0.2, 1]
            }}
            className="flex flex-col gap-1 px-4 pb-4"
        >
            <p className="font-semibold text-2xl">{gift.name}</p>
            <p className="text-label-secondary tracking-normal">
                Purchase this gift for the opportunity to give it to another user.
            </p>
            <span className="flex gap-2 items-center mt-2">
                <CurrencyIcon className="w-6 h-6"/>
                <p className="text-lg font-medium">{gift.price} {gift.currency}</p>
            </span>
            <RecentlyActionsList/>
        </motion.div>
    );
};

export default React.memo(GiftInfo);