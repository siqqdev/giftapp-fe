import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ROUTES_WITHOUT_BACK_BUTTON = [
    '/',
    '/store',
    '/gifts',
    '/leaderboard',
    '/profile'
];

const useBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackButton = useCallback(() => navigate(-1), [navigate]);

    useEffect(() => {
        const tg = window.Telegram.WebApp;

        if (!tg.BackButton) {
            return;
        }

        const shouldShowBackButton = !ROUTES_WITHOUT_BACK_BUTTON.includes(location.pathname);

        if (shouldShowBackButton) {
            tg.BackButton.show();
            tg.BackButton.onClick(handleBackButton);
        } else {
            tg.BackButton.hide();
        }

        return () => {
            tg.BackButton.offClick(handleBackButton);
        };
    }, [location.pathname, navigate]);
};

export default useBackButton;