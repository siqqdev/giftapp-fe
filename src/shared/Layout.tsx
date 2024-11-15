import React, { useEffect, useRef } from 'react'
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom'
import { TelegramProvider } from './TelegramProvider.ts'
import AnimatedRoutes from "./AnimatedRoutes.tsx"
import useBackButton from "../hooks/useBackButton.ts"
import TabBar from "@/shared/TabBar.tsx"
import Store from "@/pages/store/Store.tsx"
import Gifts from "@/pages/gifts/Gifts.tsx"
import Leaderboard from "@/pages/leaderboard/Leaderboard.tsx"
import Profile from "@/pages/profile/Profile.tsx"
import RecentActions from "@/pages/recentActions/RecentActions.tsx"
import BuyGiftSuccess from "@/pages/StatusPages/Success/BuyGiftSuccess.tsx"
import { useAppSelector } from "@/store/hooks.ts"
import ReceiveGiftSuccess from "@/pages/StatusPages/Success/ReceiveGiftSuccess.tsx"
import {STORAGE_KEYS} from "@/shared/consts.ts";
import i18n from "i18next";

const ROUTES_WITHOUT_TAB_BAR = [
    '/product',
    '/recent-actions',
    '/gift-bought-success',
    '/store/gift',
    '/receive-gift-success',
];

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const redirected = useRef(false);
    const isTabBarVisible = useAppSelector(state => state.tabBar.isVisible);
    const initialized = useRef(false);

    const initializeSettings = async () => {
        if (initialized.current) return;

        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        const telegramTheme = window.Telegram.WebApp.colorScheme;

        const theme = savedTheme || telegramTheme;
        localStorage.setItem(STORAGE_KEYS.THEME, theme);

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            TelegramProvider.setDarkTheme();
        } else {
            document.documentElement.classList.remove('dark');
            TelegramProvider.setLightTheme();
        }

        const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        const telegramLanguage = window.Telegram.WebApp.initDataUnsafe?.user?.language_code || 'ru';

        const language = savedLanguage || telegramLanguage;
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
        await i18n.changeLanguage(language);

        initialized.current = true;
    };

    useEffect(() => {
        const checkRedirect = () => {
            if (redirected.current) return;

            const initData = window.Telegram.WebApp.initData;
            const startParamMatch = initData.match(/start_param=([^&]+)/);
            console.log('Start param match:', startParamMatch);

            if (startParamMatch && startParamMatch[1]) {
                const fullParam = startParamMatch[1];

                if (fullParam.startsWith('redirect_received_gift_')) {
                    const giftId = fullParam.replace('redirect_received_gift_', '');
                    navigate(`/receive-gift-success/${giftId}`);
                    redirected.current = true;
                    sessionStorage.setItem('gift_redirected', 'true');
                } else if (fullParam === 'redirect_gifts') {
                    navigate('/gifts');
                    redirected.current = true;
                    sessionStorage.setItem('gift_redirected', 'true');
                }
            }
        };

        const wasRedirected = sessionStorage.getItem('gift_redirected') === 'true';
        if (!wasRedirected) {
            checkRedirect();
        }

        TelegramProvider.initializeApp()
        initializeSettings()

        return () => {
            redirected.current = false;
        };
    }, [navigate]);

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
                    <Route path='/recent-actions' element={<RecentActions />} />
                    <Route path='/gift-bought-success' element={<BuyGiftSuccess />} />
                    <Route path='/receive-gift-success/:id' element={<ReceiveGiftSuccess />} />
                </AnimatedRoutes>
            </div>
            {isTabBarVisible && shouldShowTabBar && <TabBar />}
        </div>
    )
}

export default Layout