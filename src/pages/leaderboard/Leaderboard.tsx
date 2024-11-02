import React from 'react';
import LeaderboardItem from "@/pages/leaderboard/components/LeaderboardItem.tsx";
import {mockLeaderboardData} from "@/shared/consts.ts";
import Input from "@/shared/ui/Input.tsx";
import SearchInput from "@/shared/ui/Input.tsx";

const Leaderboard = () => {
    return (
        <div className='flex flex-col gap-2 px-4 pt-4'>
            <SearchInput />
            {mockLeaderboardData.map((item) => (
                <LeaderboardItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    place={item.place}
                />
            ))}
        </div>
    );
};

export default Leaderboard;