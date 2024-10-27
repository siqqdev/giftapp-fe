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

    setColor: (color: string) => {
        const tg = window.Telegram.WebApp;
        if (tg) {
            tg.setHeaderColor(color);
        }
    }
};