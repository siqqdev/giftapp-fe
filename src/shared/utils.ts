import {config} from "@/config/config.ts";

export const getActionText = (action: 'BuyAction' | 'SendAction' | ''): string => {
    switch (action) {
        case 'BuyAction':
            return 'Buy Gift';
        case 'SendAction':
            return 'Send Gift';
        default:
            return action;
    }
};

export const getGiftsText = (gifts: number): string => {
    if (gifts > 1 || gifts === 0) {
        return `gifts`;
    } else {
        return `gift`;
    }
};

export const getPfpUrl : (id: string) => string = (id: string)  => `${config.backend_url}/telegram/user/pfp/${id}`
