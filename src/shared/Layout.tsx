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
import GiftPage from "@/pages/giftPage/GiftPage.tsx"
import RecentActions from "@/pages/recentActions/RecentActions.tsx"
import BuyGiftSuccess from "@/pages/StatusPages/Success/BuyGiftSuccess.tsx"
import { useAppSelector } from "@/store/hooks.ts"
import ReceiveGiftSuccess from "@/pages/StatusPages/Success/ReceiveGiftSuccess.tsx"

const ROUTES_WITHOUT_TAB_BAR = [
    '/product',
    '/recent-actions',
    '/gift-bought-success',
    '/store/gift',
    '/receive-gift-success',
];

function Layout() {
    const location = useLocation()
    const navigate = useNavigate()
    const redirected = useRef(false)
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
        const checkRedirect = () => {
            if (redirected.current) return;

            // const fake = 'DvIo/ISVld+L9muJeWJiyis42LVWWuj2EQaHXZg2Zic='
            // const fakeInitData = 'user=%7B%22id%22%3A5417816708%2C%22first_name%22%3A%22sssssss%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22ayosiqq%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5864444131071715272&chat_type=private&auth_date=1730941794&hash=9c46fa60b357dc1f6c7fe4737a4165cf7a83865fad04eb652ae652f25fbded39&startapp=' + fake;

            const initData = window.Telegram.WebApp.initData;
            const startappMatch = initData.match(/startapp=([^&]+)/);
            console.log('Startapp match:', startappMatch);

            if (startappMatch && startappMatch[1]) {
                const fullParam = decodeURIComponent(startappMatch[1]);
                const giftIdMatch = fullParam.match(/redirect_received_gift_(\d+)/);

                if (giftIdMatch && giftIdMatch[1]) {
                    console.log('REDIRECTING TO RECEIVE GIFT SUCCESS');
                    const giftId = giftIdMatch[1];
                    navigate(`/receive-gift-success/${giftId}`);
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
        setThemeBasedOnPreference()

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
                    <Route path='/product/:id' element={<GiftPage />} />
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