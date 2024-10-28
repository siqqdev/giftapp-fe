import { useEffect, useCallback } from 'react';

interface ButtonParams {
    text?: string;
    color?: string;
    textColor?: string;
    hasShineEffect?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
    isActive?: boolean;
    isVisible?: boolean;
}

interface UseTelegramButtonProps {
    type?: 'main' | 'secondary';
    initialParams?: ButtonParams;
    onClick?: () => void | Promise<void>;
    showLoaderOnClick?: boolean;
}

export const useTelegramButton = ({
                                      type = 'main',
                                      initialParams,
                                      onClick,
                                      showLoaderOnClick = true,
                                  }: UseTelegramButtonProps = {}) => {
    const button = type === 'main'
        ? window.Telegram?.WebApp?.MainButton
        : window.Telegram?.WebApp?.SecondaryButton;

    useEffect(() => {
        if (!button) return;

        if (initialParams) {
            button.setParams(initialParams);
        }

        return () => {
            button.hide();
            button.offClick(handleClick);
        };
    }, []);

    const handleClick = useCallback(async () => {
        if (!onClick) return;

        if (showLoaderOnClick) {
            button.showProgress();
        }

        try {
            await onClick();
        } finally {
            if (showLoaderOnClick) {
                button.hideProgress();
            }
        }
    }, [onClick, showLoaderOnClick]);

    useEffect(() => {
        if (!button || !onClick) return;

        button.onClick(handleClick);
        return () => button.offClick(handleClick);
    }, [handleClick]);

    return {
        setParams: (params: ButtonParams) => button?.setParams(params),
        show: () => button?.show(),
        hide: () => button?.hide(),
        enable: () => button?.enable(),
        disable: () => button?.disable(),
        showProgress: (leaveActive?: boolean) => button?.showProgress(leaveActive),
        hideProgress: () => button?.hideProgress(),
        isVisible: button?.isVisible,
        isActive: button?.isActive,
        isProgressVisible: button?.isProgressVisible,
    };
};