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

const ROUTES_WITHOUT_TAB_BAR = [
    '/gift',
];

function Layout() {
    const location = useLocation()
    const navigate = useNavigate()
    // func to change app theme based on time (if needed)
    const setThemeBasedOnTimeAndPreference = () => {
        const currentHour = new Date().getHours()
        // Set time
        const isNightTime = currentHour >= 22 || currentHour < 5
        const isTelegramDarkTheme = window.Telegram.WebApp.colorScheme === 'dark'

        if (isTelegramDarkTheme || isNightTime) {
            document.documentElement.classList.add('dark')
            TelegramProvider.setColor('#2D2F30')
        } else {
            document.documentElement.classList.remove('dark')
            TelegramProvider.setColor('#FDFAFA')
        }
    }

    useEffect(() => {
        TelegramProvider.initializeApp()

        setThemeBasedOnTimeAndPreference()
    }, [])

    useBackButton()

    const shouldShowTabBar = !ROUTES_WITHOUT_TAB_BAR.some(route =>
        location.pathname.startsWith(route)
    );

    return (
        <div className='h-screen flex flex-col safe-area-bottom'>
            <div className='flex-1 overflow-y-scroll relative content-wrapper'>
                <AnimatedRoutes >
                    <Route path="/" element={<Navigate to="/store" replace />} />
                    <Route path='/store' element={<Store />} />
                    <Route path='/gifts' element={<Gifts />} />
                    <Route path='/leaderboard' element={<Leaderboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/gift/:id' element={<GiftPage />} />
                </AnimatedRoutes>
            </div>
            {shouldShowTabBar && <TabBar />}
        </div>
    )
}

export default Layout