import {config} from "@/config/config.ts";

import { i18n } from 'i18next';

export const getActionText = (t: (key: string) => string, action?: 'BuyAction' | 'TransferAction'): string => {
    switch (action) {
        case 'BuyAction':
            return t('actions.buyGift');
        case 'TransferAction':
            return t('actions.sendGift');
        default:
            return action || '';
    }
};

export const getActionWord = (t: (key: string) => string, action?: 'BuyAction' | 'TransferAction' | 'ReceivedAction'): string => {
    switch (action) {
        case 'BuyAction':
            return t('actions.bought');
        case 'TransferAction':
            return t('actions.sent');
        case 'ReceivedAction':
            return t('actions.received');
        default:
            return action || '';
    }
}

export const getGiftsWord = (t: (key: string) => string, gifts: number): string => {
    return t('common.gifts', { count: gifts });
};

export const getPfpUrl : (file: string) => string = (file: string)  => `${config.backend_url}/telegram/image/${file}`

import blueStarImg from '@/assets/gifts/blue-star.png';
import deliciousCakeImg from '@/assets/gifts/delicious-cake.png';
import greenStarImg from '@/assets/gifts/green-star.png';
import redStarImg from '@/assets/gifts/red-star.png';
import {GiftAnimationName} from "@/inerfaces/interfaces.ts";

type ImageType = typeof blueStarImg;

export const getGiftImage = (giftName: GiftAnimationName): ImageType => {
    const nameToImage: Record<GiftAnimationName, ImageType> = {
        'Blue Star': blueStarImg,
        'Delicious Cake': deliciousCakeImg,
        'Green Star': greenStarImg,
        'Red Star': redStarImg
    };

    return nameToImage[giftName];
};

import BoughtIcon from '@/assets/icons/actions/bought.svg?react';
import ReceivedIcon from '@/assets/icons/actions/received.svg?react';
import SentIcon from '@/assets/icons/actions/sent.svg?react';
import {format} from "date-fns";

export type ActionType = 'BuyAction' | 'TransferAction' | 'ReceivedAction';

export const getActionIcon = (action?: ActionType) => {
    switch (action) {
        case 'BuyAction':
            return BoughtIcon;
        case 'TransferAction':
            return SentIcon;
        case 'ReceivedAction':
            return ReceivedIcon;
        default:
            return BoughtIcon;
    }
};

export const getActionColor = (action?: ActionType) => {
    switch (action) {
        case 'BuyAction':
            return 'bg-blue';
        case 'TransferAction':
            return 'bg-purple';
        case 'ReceivedAction':
            return 'bg-green';
        default:
            return 'bg-blue';
    }
}

export const formatDate = (dateString?: string, pattern = 'MM.dd.yyyy \'at\' HH:mm') => {
    if (!dateString) return
    const date = new Date(dateString);
    return format(date, pattern);
};

export const getActionHistoryWord = (t, action?: 'BuyAction' | 'TransferAction' | 'ReceivedAction'): string => {
    switch (action) {
        case 'BuyAction':
            return t('actionHistory.buy');
        case 'TransferAction':
            return t('actionHistory.send');
        case 'ReceivedAction':
            return t('actionHistory.receive');
        default:
            return action || '';
    }
}

export const getPlaceEmoji = (place) => {
    switch (place) {
        case 1:
            return '🥇';
        case 2:
            return '🥈';
        case 3:
            return '🥉';
        default:
            return `#${place}`;
    }
};