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