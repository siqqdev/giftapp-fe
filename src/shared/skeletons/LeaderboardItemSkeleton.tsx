const LeaderboardItemSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 items-start cursor-default">
            <div className="flex gap-4 items-center justify-between w-full">
                <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />

                    <div className="flex flex-col items-start gap-2">
                        <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />

                        <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
                    </div>
                </div>

                <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
            </div>
        </div>
    );
};

export default LeaderboardItemSkeleton;