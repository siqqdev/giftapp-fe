import React from 'react';

const GiftInfoTable = ({ gift, date, price, availability }) => {
    return (
        <div className="w-full flex flex-col items-center bg-white dark:bg-bg-dark-placeholder rounded-2xl">
            <table className="w-full">
                <tbody>
                <tr>
                    <td className="px-4 py-2 text-label-secondary border-r border-separator/36 dark:border-white/20 w-1/2">Gift</td>
                    <td className="px-4 py-2 font-normal">{gift}</td>
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