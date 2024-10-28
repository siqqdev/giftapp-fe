import Cake from '@/assets/animations/gift-delicious-cake.json'
import BlueStar from '@/assets/animations/gift-blue-star.json'
import GreenStar from '@/assets/animations/gift-green-star.json'
import RedStar from '@/assets/animations/gift-red-star.json'
import TransparentTon from '@/assets/icons/currencies/transparent/ton.svg?react';
import TransparentUSDT from '@/assets/icons/currencies/transparent/usdt.svg?react';
import TransparentETH from '@/assets/icons/currencies/transparent/eth.svg?react';
import Ton from '@/assets/icons/currencies/filled/ton.svg?react'
import USDT from '@/assets/icons/currencies/filled/usdt.svg?react'
import Eth from '@/assets/icons/currencies/filled/eth.svg?react'

export interface Gift {
    id: number;
    animationData: string;
    color: 'gold' | 'red' | 'green' | 'blue';
    name: string;
    price: number;
    currency: 'TON' | 'USDT' | 'ETH';
    amount: number;
    description?: string;
}

export const giftsMockData = [
    {
        id: 1,
        name: 'Delicious Cake',
        color: 'gold',
        animationData: Cake,
        price: 10,
        currency: 'USDT',
        amount: 3,
    },
    {
        id: 2,
        name: 'Blue Star',
        color: 'blue',
        animationData: BlueStar,
        price: 15,
        currency: 'TON',
        amount: 7,
    },
    {
        id: 3,
        name: 'Green Star',
        color: 'green',
        animationData: GreenStar,
        price: 12,
        currency: 'ETH',
        amount: 5,
    },
    {
        id: 4,
        name: 'Red Star',
        color: 'red',
        animationData: RedStar,
        price: 20,
        currency: 'USDT',
        amount: 2,
    },
] as const;

export const getGiftById = (id: number): Gift | undefined => {
    return giftsMockData.find(gift => gift.id === id);
};

export const TransparentCurrencyIcon = {
    TON: TransparentTon,
    USDT: TransparentUSDT,
    ETH: TransparentETH
} as const;

export const FilledCurrencyIcon = {
    TON: Ton,
    USDT: USDT,
    ETH: Eth
} as const;

export const gradientClassNames = {
    gold: 'bg-gradient-to-b from-gold/20 to-gold/5',
    green: 'bg-gradient-to-b from-green/20 to-green/5',
    blue: 'bg-gradient-to-b from-blue/20 to-blue/5',
    red: 'bg-gradient-to-b from-red/20 to-red/5',
} as const;