export const TelegramProvider = {
    initializeApp: () => {
        const tg = window?.Telegram?.WebApp;

        if (tg) {
            tg.ready();
            tg.expand();
            tg.enableClosingConfirmation();
            tg.setBackgroundColor("#1b1b1b");
            tg.disableVerticalSwipes()
        }
    },

    setDarkTheme: () => {
        const tg = window?.Telegram?.WebApp;
        const darkColor = '#1C1C1E';

        if (tg) {
            tg.setHeaderColor(darkColor);
            tg.setBackgroundColor(darkColor);
        }
    },

    setLightTheme: () => {
        const tg = window?.Telegram?.WebApp;

        if (tg) {
            tg.setHeaderColor('#fff');
            tg.setBackgroundColor('#fff');
        }
    },
};