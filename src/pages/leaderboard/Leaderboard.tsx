import React, { useState, useCallback } from 'react';
import { AnimatePresence } from "framer-motion";
import SearchInput from "@/shared/ui/Input.tsx";
import { mockLeaderboardData } from "@/shared/consts.ts";
import UserProfileModal from "@/pages/leaderboard/components/UserProfileModal.tsx";
import LeaderboardItem from "@/pages/leaderboard/components/LeaderboardItem.tsx";

const Leaderboard = () => {
    const [selectedItem, setSelectedItem] = useState(null);
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
            {mockLeaderboardData.map((item) => (
                <LeaderboardItem
                    {...item}
                    onSelect={handleSelectItem}
                />
            ))}
            <AnimatePresence mode="wait">
                {selectedItem && (
                    <UserProfileModal
                        from={selectedItem.rect}
                        onComplete={() => {
                            if (isClosing) {
                                setSelectedItem(null);
                                setIsClosing(false);
                            }
                        }}
                        userData={selectedItem}
                        isClosing={isClosing}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Leaderboard;