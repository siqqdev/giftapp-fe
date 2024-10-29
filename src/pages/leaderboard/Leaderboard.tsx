import React from 'react';
import LeaderboardItem from "@/pages/leaderboard/components/LeaderboardItem.tsx";

const Leaderboard = () => {
    return (
        <div className='flex flex-col gap-2 px-4'>
            <LeaderboardItem />
        </div>
    );
};

export default Leaderboard;