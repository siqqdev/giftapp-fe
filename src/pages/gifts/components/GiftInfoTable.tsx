import React from 'react';
import Avatar from "@/shared/ui/Avatar.tsx";
import MockAvatar from '@/assets/mockAvatar.png';
import {CurrencyType, GiftAnimationName, ITgUser} from "@/inerfaces/interfaces.ts";
import {FilledCurrencyIcon} from "@/shared/consts.ts";
import {useTranslation} from "react-i18next";

interface props {
    date: string;
    price: string;
    availability: string;
    user?: ITgUser;
    asset: CurrencyType;
    receivedAmount: number
    isProfile: boolean
    giftName?: GiftAnimationName
}

const GiftInfoTable = ({ giftName, date, price, user, asset, receivedAmount, isProfile}: props) => {
    const {t} = useTranslation()
    const CurrencyIcon = FilledCurrencyIcon[asset] as React.FC
    console.log(user)

    return (
        <div className="w-full flex flex-col items-center bg-white dark:bg-bg-dark-placeholder rounded-2xl">
            <table className="w-full">
                <tbody>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-separator/36 dark:border-white/20 w-1/2">
                        {isProfile ? t('drawer.table.from') : t('drawer.table.gift')}
                    </td>
                    <td className="px-4 py-2 font-normal flex">
                        {isProfile ? (
                            <span className='flex items-center gap-2 text-blue'>
                                <Avatar
                                    lastName={user?.lastName}
                                    firstName={user?.firstName}
                                    file={user?.photosPath?.small || user?.photosPath?.large || ''}
                                    className='w-4 h-4'
                                />
                                {user?.firstName}
                            </span>
                        ) : (
                            giftName
                        )}
                    </td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-t border-separator/36 dark:border-white/20 w-1/2">
                        {t('drawer.table.date')}
                    </td>
                    <td className="px-4 py-2 font-normal border-t border-separator/36 dark:border-white/20">
                        {date}
                    </td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-t border-separator/36 dark:border-white/20 w-1/2">
                        {t('drawer.table.price')}
                    </td>
                    <td className="px-4 py-2 font-normal border-t border-separator/36 dark:border-white/20 flex gap-1 items-center">
                        {price}
                        <CurrencyIcon className='w-4 h-4' />
                    </td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-t border-separator/36 dark:border-white/20 w-1/2">
                        {t('drawer.table.availability')}
                    </td>
                    <td className="px-4 py-2 font-normal border-t border-separator/36 dark:border-white/20">{receivedAmount} {t('of')} 10K</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GiftInfoTable;