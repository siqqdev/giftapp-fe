import React, { useState, useCallback } from 'react';
import { AnimatePresence } from "framer-motion";
import SearchInput from "@/shared/ui/Input.tsx";
import { mockLeaderboardData } from "@/shared/consts.ts";
import UserProfileModal from "@/pages/leaderboard/components/UserProfileModal.tsx";
import LeaderboardItem from "@/pages/leaderboard/components/LeaderboardItem.tsx";
import {useGetLeaderboardQuery} from "@/api/endpoints/leaderBoardApi.ts";
import {ITgUser, IUser} from "@/inerfaces/interfaces.ts";
import LeaderboardItemSkeleton from "@/shared/skeletons/LeaderboardItemSkeleton.tsx";

const Leaderboard = () => {
    const {data: leaderboard, isLoading, isFetching} = useGetLeaderboardQuery()
    const [selectedItem, setSelectedItem] = useState<{user: IUser, rect: DOMRect, tgInfo: ITgUser}>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setIsClosing(false);
    };

    const closeModal = useCallback(() => {
        setSelectedItem(null);
        setIsClosing(false);
    }, []);

    return (
        <div className="flex flex-col gap-2 px-4 pt-4 pb-20">
            <SearchInput />
            {isLoading || isFetching && (
                Array.from({length: 10}).map((_) => (
                    <LeaderboardItemSkeleton />
                ))
            )}
            {leaderboard?.users?.map((user) => (
                <LeaderboardItem
                    user={user}
                    onSelect={handleSelectItem}
                />
            ))}
            <AnimatePresence mode="wait">
                {selectedItem && (
                    <UserProfileModal
                        tgInfo={selectedItem.tgInfo}
                        from={selectedItem.rect}
                        onComplete={() => {
                            if (isClosing) {
                                setSelectedItem(null);
                                setIsClosing(false);
                            }
                        }}
                        user={selectedItem.user}
                        isClosing={isClosing}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Leaderboard;