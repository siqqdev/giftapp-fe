import TransparentTon from '@/assets/icons/currencies/transparent/ton.svg?react';
import TransparentUSDT from '@/assets/icons/currencies/transparent/usdt.svg?react';
import TransparentETH from '@/assets/icons/currencies/transparent/eth.svg?react';
import Ton from '@/assets/icons/currencies/filled/ton.svg?react'
import USDT from '@/assets/icons/currencies/filled/usdt.svg?react'
import Eth from '@/assets/icons/currencies/filled/eth.svg?react'

export const STORAGE_KEYS = {
    THEME: 'app-theme',
    LANGUAGE: 'app-language'
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
    'Delicious Cake': 'bg-gradient-to-b from-gold/20 to-gold/5',
    'Green Star': 'bg-gradient-to-b from-green/20 to-green/5',
    'Blue Star': 'bg-gradient-to-b from-blue/20 to-blue/5',
    'Red Star': 'bg-gradient-to-b from-red/20 to-red/5',
} as const;