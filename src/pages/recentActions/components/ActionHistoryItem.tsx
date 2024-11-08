import React from 'react';
import BoughtIcon from '@/assets/icons/actions/bought.svg?react'
import ReceivedIcon from '@/assets/icons/actions/received.svg?react'
import SentIcon from '@/assets/icons/actions/sent.svg?react'
import {IActionHistoryItem, IUserRecentAction, SVGProps} from "@/inerfaces/interfaces.ts";
import {
    ActionType,
    getActionColor,
    getActionIcon,
    getGiftImage
} from "@/shared/utils.ts";
import {useDynamicTranslations} from "@/hooks/useDynamicTranslations.ts";
import {useTranslation} from "react-i18next";

interface props {
    action: IUserRecentAction;
}

const ActionHistoryItem = ({ action }: props) => {
    const {t} = useTranslation()
    const {getActionHistoryWord, getActionWord} = useDynamicTranslations()

    const actionType = (): ActionType => {
        const myId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || '5417816708'

        if (action?.type === 'BuyAction') {
            return 'BuyAction';
        }

        if (action?.type === 'TransferAction') {
            if (action?.user?.id === myId) {
                return 'TransferAction';
            }
            if (action?.toUser?.id === myId) {
                return 'ReceivedAction';
            }
            return 'TransferAction';
        }

        return 'BuyAction';
    }

    const Icon = getActionIcon(actionType()) as React.FC<SVGProps>

    const renderActionInfo = () => {
        switch (actionType()) {
            case 'BuyAction':
                return <span className='font-medium flex gap-1'>-{action?.gift?.price} USDT</span>
            case 'TransferAction':
                return (
                    <span className='font-medium flex gap-1'>
                        {t('to')} <p className='text-blue'>{action?.toUser?.firstLastName}</p>
                    </span>
                )
            case 'ReceivedAction':
                return (
                    <span className='font-medium flex gap-1'>
                        {t('from')} <p className='text-blue'>{action?.user?.firstLastName}</p>
                    </span>
                )
        }
    }

    return (
        <div className="flex flex-col gap-2 items-start">
            <div className="flex gap-4 items-center justify-between w-full">
                <div className='flex gap-4 items-center'>
                    <div className="relative">
                        <img
                            src={getGiftImage(action?.gift?.name)}
                            alt=""
                            className="w-12 h-12 bg-bg-secondary dark:bg-bg-dark-placeholder p-1 rounded-xl"
                        />
                        <span className={`absolute -bottom-1 -right-1 ${getActionColor(actionType())} rounded-full p-1 border-2 border-white dark:border-bg-dark`}>
                            {<Icon />}
                        </span>
                    </div>

                    <div className='flex flex-col items-start'>
                        <p className='text-label-secondary'>{getActionHistoryWord(actionType())}</p>
                        <p className='font-medium'>{action?.gift?.name}</p>
                    </div>
                </div>

                {renderActionInfo()}
            </div>
        </div>
    );
};

export default ActionHistoryItem;