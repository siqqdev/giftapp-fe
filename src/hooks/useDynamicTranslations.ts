import { useTranslation } from 'react-i18next';
import {getActionHistoryWord, getActionText, getActionWord, getGiftsWord} from "@/shared/utils.ts";

export const useDynamicTranslations = () => {
    const { t } = useTranslation();

    return {
        getActionText: (action?: 'BuyAction' | 'TransferAction') => getActionText(t, action),
        getActionWord: (action?: 'BuyAction' | 'TransferAction' | 'ReceivedAction') => getActionWord(t, action),
        getActionHistoryWord: (action?: 'BuyAction' | 'TransferAction' | 'ReceivedAction') => getActionHistoryWord(t, action),
        getGiftsWord: (gifts: number) => getGiftsWord(t, gifts),
    };
};
