import {config} from "@/config/config.ts";

export const getActionText = (action?: 'BuyAction' | 'TransferAction' ):string => {
    switch (action) {
        case 'BuyAction':
            return 'Buy Gift';
        case 'TransferAction':
            return 'Send Gift';
        default:
            return action || '';
    }
};

export const getActionWord = (action?: 'BuyAction' | 'TransferAction'): string => {
    switch (action) {
        case 'BuyAction':
            return 'bought';
        case 'TransferAction':
            return 'sent';
        default:
            return action || '';
    }
}

export const getGiftsWord = (gifts: number): string => {
    if (gifts > 1 || gifts === 0) {
        return `gifts`;
    } else {
        return `gift`;
    }
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

type ActionType = 'BuyAction' | 'TransferAction' | 'ReceivedAction';

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