import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';

// Animations
import StoreAnim from '@/assets/animations/tab-store.json';
import GiftsAnim from '@/assets/animations/tab-gifts.json';
import LeaderboardAnim from '@/assets/animations/tab-leaderboard.json';
import ProfileAnim from '@/assets/animations/tab-profile.json';

// Icons
import StoreIcon from '@/assets/icons/tabbar/store.svg?react';
import GiftsIcon from '@/assets/icons/tabbar/gifts.svg?react';
import LeaderboardIcon from '@/assets/icons/tabbar/leaderboard.svg?react';
import ProfileIcon from '@/assets/icons/tabbar/profile.svg?react';

const TabIcon = ({ Icon, isActive }) => (
    <Icon
        className={`w-full h-full ${isActive ? 'fill-blue' : 'fill-icons-gray'}`}
    />
);

const tabs = [
    {
        name: 'Store',
        Icon: StoreIcon,
        animation: StoreAnim,
        path: '/store'
    },
    {
        name: 'Gifts',
        Icon: GiftsIcon,
        animation: GiftsAnim,
        path: '/gifts'
    },
    {
        name: 'Leaderboard',
        Icon: LeaderboardIcon,
        animation: LeaderboardAnim,
        path: '/leaderboard'
    },
    {
        name: 'Profile',
        Icon: ProfileIcon,
        animation: ProfileAnim,
        path: '/profile'
    }
];

const TabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState({});

    const handleTabClick = (path) => {
        setIsPlaying(prev => ({ ...prev, [path]: true }));
        navigate(path);

        setTimeout(() => {
            setIsPlaying(prev => ({ ...prev, [path]: false }));
        }, 400);
    };

    const getBlueFilter = () => {
        return {
            filter: `
                brightness(0) 
                saturate(100%) 
                invert(40%) 
                sepia(98%) 
                saturate(1800%) 
                hue-rotate(198deg) 
                brightness(95%)
            `
        };
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 pb-safe">
            <div className="flex justify-around items-center h-16">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    const showAnimation = isPlaying[tab.path];

                    return (
                        <div
                            key={tab.path}
                            className="flex flex-col items-center w-full cursor-pointer"
                            onClick={() => handleTabClick(tab.path)}
                        >
                            <div className="w-6 h-6 relative">
                                {showAnimation ? (
                                    <div style={isActive ? getBlueFilter() : undefined}>
                                        <Lottie
                                            animationData={tab.animation}
                                            loop={false}
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <TabIcon
                                        Icon={tab.Icon}
                                        isActive={isActive}
                                    />
                                )}
                            </div>
                            <span
                                className={`mt-1 text-xs font-semibold ${
                                    isActive ? 'text-blue' : 'text-icons-gray'
                                }`}
                            >
                                {tab.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TabBar;