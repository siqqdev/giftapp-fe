import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ROUTES_WITHOUT_BACK_BUTTON = [
    '/',
    '/store',
    '/gifts',
    '/leaderboard',
    '/profile'
];

interface UseBackButtonProps {
    isModal?: boolean;
    onModalClose?: () => void;
    hideOnClose?: boolean;
}

const useBackButton = ({
                           isModal = false,
                           onModalClose,
                           hideOnClose = true
                       }: UseBackButtonProps = {}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackButton = useCallback(() => {
        if (isModal && onModalClose) {
            onModalClose();
        } else {
            navigate(-1);
        }
    }, [isModal, onModalClose, navigate]);

    useEffect(() => {
        const tg = window.Telegram.WebApp;

        if (!tg.BackButton) {
            return;
        }

        const shouldShowBackButton = isModal || !ROUTES_WITHOUT_BACK_BUTTON.includes(location.pathname);

        if (shouldShowBackButton) {
            tg.BackButton.show();
            tg.BackButton.onClick(handleBackButton);
        } else {
            tg.BackButton.hide();
        }

        return () => {
            tg.BackButton.offClick(handleBackButton);

            if (isModal && hideOnClose) {
                tg.BackButton.hide();
            }
        };
    }, [location.pathname, handleBackButton, isModal, hideOnClose]);
};

export default useBackButton;