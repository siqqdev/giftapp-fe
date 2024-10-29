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
import CakeImg from '@/assets/gifts/delicious-cake.png'
import BlueStarImg from '@/assets/gifts/blue-star.png'
import GreenStarImg from '@/assets/gifts/green-star.png'
import RedStarImg from '@/assets/gifts/red-star.png'

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

export const mockActions = [
    {
        action: 'bought',
        giftName: 'Delicious Cake',
        giftImg: CakeImg,
        amount: 10,
        timestamp: '2024-10-23T14:30:00Z'
    },
    {
        action: 'sent',
        giftName: 'Blue Star',
        giftImg: BlueStarImg,
        user: 'Alicia',
        timestamp: '2024-10-23T15:20:00Z'
    },
    {
        action: 'received',
        giftName: 'Red Star',
        giftImg: RedStarImg,
        user: 'John',
        timestamp: '2024-10-23T16:45:00Z'
    },
    {
        action: 'bought',
        giftName: 'Green Star',
        giftImg: GreenStarImg,
        amount: 5,
        timestamp: '2024-10-22T10:15:00Z'
    },
    {
        action: 'sent',
        giftName: 'Delicious Cake',
        giftImg: CakeImg,
        user: 'Emma',
        timestamp: '2024-10-22T11:30:00Z'
    },
    {
        action: 'received',
        giftName: 'Blue Star',
        giftImg: BlueStarImg,
        user: 'Mike',
        timestamp: '2024-10-21T09:00:00Z'
    },
    {
        action: 'bought',
        giftName: 'Red Star',
        giftImg: RedStarImg,
        amount: 15,
        timestamp: '2024-10-21T14:20:00Z'
    },
    {
        action: 'sent',
        giftName: 'Green Star',
        giftImg: GreenStarImg,
        user: 'Sarah',
        timestamp: '2024-10-20T16:30:00Z'
    },
    {
        action: 'received',
        giftName: 'Delicious Cake',
        giftImg: CakeImg,
        user: 'Tom',
        timestamp: '2024-10-19T09:15:00Z'
    },
    {
        action: 'bought',
        giftName: 'Blue Star',
        giftImg: BlueStarImg,
        amount: 25,
        timestamp: '2024-10-19T10:45:00Z'
    },
    {
        action: 'sent',
        giftName: 'Red Star',
        giftImg: RedStarImg,
        user: 'Lily',
        timestamp: '2024-10-18T15:00:00Z'
    },
    {
        action: 'received',
        giftName: 'Green Star',
        giftImg: GreenStarImg,
        user: 'Alex',
        timestamp: '2024-10-17T12:30:00Z'
    }
];