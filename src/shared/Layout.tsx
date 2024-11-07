import React, { useEffect } from 'react'
import {Navigate, Route, useLocation} from 'react-router-dom'
import { TelegramProvider } from './TelegramProvider.ts'
import AnimatedRoutes from "./AnimatedRoutes.tsx";
import useBackButton from "../hooks/useBackButton.ts";
import TabBar from "@/shared/TabBar.tsx";
import Store from "@/pages/store/Store.tsx";
import Gifts from "@/pages/gifts/Gifts.tsx";
import Leaderboard from "@/pages/leaderboard/Leaderboard.tsx";
import Profile from "@/pages/profile/Profile.tsx";
import GiftPage from "@/pages/giftPage/GiftPage.tsx";
import RecentActions from "@/pages/recentActions/RecentActions.tsx";
import BuyGiftSuccess from "@/pages/StatusPages/Success/BuyGiftSuccess.tsx";
import {useAppSelector} from "@/store/hooks.ts";

const ROUTES_WITHOUT_TAB_BAR = [
    '/product',
    '/recent-actions',
    '/gift-bought-success',
    '/store/gift',
];

function Layout() {
    const location = useLocation()
    const isTabBarVisible = useAppSelector(state => state.tabBar.isVisible)

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
        <div className='h-screen flex flex-col overflow-y-scroll bg-white dark:bg-bg-dark'>
            <div className='flex-1 overflow-y-scroll relative content-wrapper h-screen'>
                <AnimatedRoutes >
                    <Route path="/" element={<Navigate to="/store" replace />} />
                    <Route path='/store' element={<Store />} />
                    <Route path='/gifts' element={<Gifts />} />
                    <Route path='/leaderboard' element={<Leaderboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/product/:id' element={<GiftPage />} />
                    <Route path='/recent-actions' element={<RecentActions />} />
                    <Route path='/gift-bought-success' element={<BuyGiftSuccess />} />
                </AnimatedRoutes>
            </div>
            {isTabBarVisible && shouldShowTabBar && <TabBar />}
        </div>
    )
}

export default Layout