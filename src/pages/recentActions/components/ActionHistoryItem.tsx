import React from 'react';
import BoughtIcon from '@/assets/icons/actions/bought.svg?react'
import ReceivedIcon from '@/assets/icons/actions/received.svg?react'
import SentIcon from '@/assets/icons/actions/sent.svg?react'
import {IActionHistoryItem} from "@/inerfaces/interfaces.ts";

const ActionHistoryItem = ({ action, user, amount, giftName, giftImg }: IActionHistoryItem) => {
    const getActionIcon = () => {
        switch (action) {
            case 'bought':
                return {
                    icon: <BoughtIcon className="w-3 h-3 text-white" />,
                    bgColor: 'bg-blue'
                }
            case 'received':
                return {
                    icon: <ReceivedIcon className="w-3 h-3 text-white" />,
                    bgColor: 'bg-green'
                }
            case 'sent':
                return {
                    icon: <SentIcon className="w-3 h-3 text-white" />,
                    bgColor: 'bg-purple'
                }
        }
    }

    const getActionText = () => {
        switch (action) {
            case 'bought':
                return 'Buy'
            case 'received':
                return 'Receive'
            case 'sent':
                return 'Sent'
        }
    }

    const renderActionInfo = () => {
        switch (action) {
            case 'bought':
                return amount && <span className='font-medium flex gap-1'>-{amount} USDT</span>
            case 'sent':
                return user && (
                    <span className='font-medium flex gap-1'>
                        to <p className='text-blue'>{user}</p>
                    </span>
                )
            case 'received':
                return user && (
                    <span className='font-medium flex gap-1'>
                        from <p className='text-blue'>{user}</p>
                    </span>
                )
        }
    }

    const { icon, bgColor } = getActionIcon()

    // TODO: add separator

    return (
        <div className="flex flex-col gap-2 items-start">
            <div className="flex gap-4 items-center justify-between w-full">
                <div className='flex gap-4 items-center'>
                    <div className="relative">
                        <img
                            src={giftImg}
                            alt=""
                            className="w-12 h-12 bg-bg-secondary dark:bg-bg-dark-placeholder p-1 rounded-xl"
                        />
                        <span className={`absolute -bottom-1 -right-1 ${bgColor} rounded-full p-1 border-2 border-white dark:border-bg-dark`}>
                            {icon}
                        </span>
                    </div>

                    <div className='flex flex-col items-start'>
                        <p className='text-label-secondary'>{getActionText()}</p>
                        <p className='font-medium'>{giftName}</p>
                    </div>
                </div>

                {renderActionInfo()}
            </div>
        </div>
    );
};

export default ActionHistoryItem;