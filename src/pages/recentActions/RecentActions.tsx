import React, {useState} from 'react';
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";
import ActionHistoryItem from "@/pages/recentActions/components/ActionHistoryItem.tsx";
import { useGetUserActionsQuery } from "@/api/endpoints/userApi.ts";
import { formatDate } from '@/shared/utils';
import { RecentActionsSkeleton } from "@/shared/skeletons/RecentActionsSkeleton.tsx";
import ListPaginator from "@/shared/components/ListPaginator.tsx";

const RecentActions = () => {
    const [page, setPage] = useState<number>(1)
    const { data: actionsData, isLoading, isFetching } = useGetUserActionsQuery({ page, limit: 10 });

    if (isLoading) return <RecentActionsSkeleton />

    const groupActions = (backendActions) => {
        if (!backendActions?.items) return [];

        const groupedActions = backendActions.items.reduce((groups, action) => {
            const date = new Date(action.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long'
            });

            if (!groups[formattedDate]) {
                groups[formattedDate] = [];
            }

            groups[formattedDate].push(action);
            return groups;
        }, {});

        return groupedActions;
    };

    const hasItems = actionsData?.items?.length > 0;
    const groupedActions = groupActions(actionsData);

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (!hasItems) {
        return (
            <BalloonsPlaceholder className="text-black dark:text-white">
                <>
                    <p className="font-semibold text-2xl tracking-tighter text-center mt-2">
                        History is Empty
                    </p>
                    <p className="text-xl tracking-tighter text-center mt-1">
                        Give and receive gifts so there's<br/>something here.
                    </p>
                </>
            </BalloonsPlaceholder>
        );
    }

    return (
        <ListPaginator onBottomReached={() => setPage(prevState => prevState + 1)} className='h-screen'>
            <div className="flex flex-col gap-6 pt-10 px-4 pb-4 text-black dark:text-white">
                <div className="flex flex-col gap-4">
                    <p className="tracking-tighter font-semibold text-2xl text-center">
                        Recent actions
                    </p>
                    <p className="text-label-secondary text-center text-xl">
                        Here is your actions history.
                    </p>
                </div>

                {Object.entries(groupedActions).map(([date, actions]) => (
                    <div key={date} className="flex flex-col gap-2">
                        <p className="text-label-date">{date}</p>
                        <div className="flex flex-col gap-4">
                            {actions.map((action, index) => (
                                <ActionHistoryItem
                                    action={action}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ListPaginator>
    );
};

export default RecentActions;