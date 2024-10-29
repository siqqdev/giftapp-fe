import React, { useEffect } from 'react'
import {Navigate, Route, useLocation, useNavigate} from 'react-router-dom'
import { TelegramProvider } from './TelegramProvider.ts'
import AnimatedRoutes from "./AnimatedRoutes.tsx";
import useBackButton from "../hooks/useBackButton.ts";
import Home from "../pages/Home.tsx";
import TabBar from "@/shared/TabBar.tsx";
import Store from "@/pages/store/Store.tsx";
import Gifts from "@/pages/gifts/Gifts.tsx";
import Leaderboard from "@/pages/leaderboard/Leaderboard.tsx";
import Profile from "@/pages/profile/Profile.tsx";
import GiftPage from "@/pages/giftPage/GiftPage.tsx";
import RecentActions from "@/pages/recentActions/RecentActions.tsx";

const ROUTES_WITHOUT_TAB_BAR = [
    '/product',
    '/recent-actions'
];

function Layout() {
    const location = useLocation()

    const setThemeBasedOnPreference = () => {
        const isTelegramDarkTheme = window.Telegram.WebApp.colorScheme === 'dark'

        if (isTelegramDarkTheme) {
            document.documentElement.classList.add('dark')
            TelegramProvider.setDarkTheme()
        } else {
            document.documentElement.classList.remove('dark')
            TelegramProvider.setLightTheme()
        }
    }

    useEffect(() => {
        TelegramProvider.initializeApp()
        setThemeBasedOnPreference()
    }, [])

    useBackButton()

    const shouldShowTabBar = !ROUTES_WITHOUT_TAB_BAR.some(route =>
        location.pathname.startsWith(route)
    );

    return (
        <div className='h-screen flex flex-col overflow-y-scroll bg-white'>
            <div className='flex-1 overflow-y-scroll relative content-wrapper'>
                <AnimatedRoutes >
                    <Route path="/" element={<Navigate to="/store" replace />} />
                    <Route path='/store' element={<Store />} />
                    <Route path='/gifts' element={<Gifts />} />
                    <Route path='/leaderboard' element={<Leaderboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/product/:id' element={<GiftPage />} />
                    <Route path='/recent-actions' element={<RecentActions />} />
                </AnimatedRoutes>
            </div>
            {shouldShowTabBar && <TabBar />}
        </div>
    )
}

export default Layout