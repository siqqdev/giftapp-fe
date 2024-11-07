import React from 'react';
import Avatar from "@/shared/ui/Avatar.tsx";
import MockAvatar from '@/assets/mockAvatar.png';

type BaseProps = {
    date: string;
    price: string;
    availability: string;
}

type props = BaseProps & (
    | { giftName: string; user?: never }
    | { user: { name: string; pfp: string }; giftName?: never }
    );

const GiftInfoTable = ({ giftName, user, date, price, availability }: props) => {
    return (
        <div className="w-full flex flex-col items-center bg-white dark:bg-bg-dark-placeholder rounded-2xl">
            <table className="w-full">
                <tbody>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-separator/36 dark:border-white/20 w-1/2">
                        {giftName ? 'Gift' : 'From'}
                    </td>
                    <td className="px-4 py-2 font-normal flex">
                        {giftName ? (
                            giftName
                        ) : (
                            <span className='flex items-center gap-2 text-blue'>
                                <Avatar file={user.pfp} className='w-4 h-4'/>
                                {user.name}
                            </span>
                        )}
                    </td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-t border-separator/36 dark:border-white/20 w-1/2">Date</td>
                    <td className="px-4 py-2 font-normal border-t border-separator/36 dark:border-white/20">{date}</td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-t border-separator/36 dark:border-white/20 w-1/2">Price</td>
                    <td className="px-4 py-2 font-normal border-t border-separator/36 dark:border-white/20">{price} USDT</td>
                </tr>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-t border-separator/36 dark:border-white/20 w-1/2">Availability</td>
                    <td className="px-4 py-2 font-normal border-t border-separator/36 dark:border-white/20">{availability}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GiftInfoTable;