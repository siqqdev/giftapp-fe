import React from 'react';
import { motion } from 'framer-motion';
import { FilledCurrencyIcon } from "@/shared/consts.ts";
import RecentlyActionsList from "@/pages/giftPage/components/RecentlyActionsList.tsx";
import {IGift, SVGProps} from "@/inerfaces/interfaces.ts";
import {useGetGiftActionsQuery} from "@/api/endpoints/giftApi.ts";

interface GiftInfoProps {
    gift: IGift;
    isClosing: boolean;
}

const GiftInfo = ({ gift, isClosing }: GiftInfoProps) => {
    const CurrencyIcon = FilledCurrencyIcon[gift.asset] as React.FC<SVGProps>;

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
            <div className='flex gap-2 items-center'>
                <p className="font-semibold text-2xl">{gift.name}</p>
                <span className='rounded-full bg-[#007AFF1F] font-medium text-sm text-center3 text-blue px-2 py-1'>
                    {gift.soldAmount} of {gift.totalAmount}
                </span>
            </div>
            <p className="text-label-secondary tracking-normal">
                Purchase this gift for the opportunity to give it to another user.
            </p>
            <span className="flex gap-2 items-center mt-2">
                <CurrencyIcon className="w-6 h-6"/>
                <p className="text-lg font-medium">{gift.price} {gift.asset}</p>
            </span>
            <RecentlyActionsList id={gift._id}/>
        </motion.div>
    );
};

export default React.memo(GiftInfo);