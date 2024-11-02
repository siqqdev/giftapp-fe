import React from 'react';
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";
import ActionHistoryItem from "@/pages/recentActions/components/ActionHistoryItem.tsx";
import {mockActions} from "@/shared/consts.ts";

interface ActionItem {
    action: 'bought' | 'received' | 'sent';
    giftName: string;
    amount?: number;
    user?: string;
    timestamp: string;
    giftImg: string;
}

interface GroupedActions {
    [date: string]: ActionItem[];
}

const RecentActions = () => {
    const groupActionsByDate = (actions: ActionItem[]): GroupedActions => {
        return actions.reduce((groups, action) => {
            const date = new Date(action.timestamp);
            const formattedDate = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long'
            });

            if (!groups[formattedDate]) {
                groups[formattedDate] = [];
            }
            groups[formattedDate].push(action);
            return groups;
        }, {} as GroupedActions);
    };

    const hasItems = mockActions.length > 0;
    const groupedActions = groupActionsByDate(mockActions);

    if (!hasItems) return (
        <BalloonsPlaceholder className='text-black dark:text-white'>
            <>
                <p className='font-semibold text-2xl tracking-tighter text-center mt-2'>History is Empty</p>
                <p className='text-xl tracking-tighter text-center mt-1'>
                    Give and receive gifts so there's<br/>something here.
                </p>
            </>
        </BalloonsPlaceholder>
    );

    return (
        <div className='flex flex-col gap-6 pt-10 px-4 pb-4 text-black dark:text-white'>
            <div className='flex flex-col gap-4'>
                <p className='tracking-tighter font-semibold text-2xl text-center'>Recent actions</p>
                <p className='text-label-secondary text-center text-xl'>Here is your actions history.</p>
            </div>

            {Object.entries(groupedActions).map(([date, actions]) => (
                <div key={date} className="flex flex-col gap-2">
                    <p className="text-label-date">{date}</p>
                    <div className="flex flex-col gap-4">
                        {actions.map((action, index) => (
                            <ActionHistoryItem
                                key={`${date}-${index}`}
                                date={date}
                                action={action.action}
                                amount={action.amount}
                                user={action.user}
                                giftName={action.giftName}
                                giftImg={action.giftImg}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentActions;