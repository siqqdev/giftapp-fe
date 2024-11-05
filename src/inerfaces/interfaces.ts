import {AnimationNameType} from "@/shared/components/AnimatedLottie.tsx";
import React from "react";

export interface IActionHistoryItemProps {
    action: 'bought' | 'received' | 'sent'
    giftName: string
    giftImg: string
    user?: string
    amount?: number
}

type ExclusiveUserOrAmount =
    | (Pick<IActionHistoryItemProps, 'giftName' | 'giftImg'> & { user: string; amount?: never })
    | (Pick<IActionHistoryItemProps, 'giftName' | 'giftImg'> & { user?: never; amount: number });

export type IActionHistoryItem = ExclusiveUserOrAmount & Omit<IActionHistoryItemProps, 'user' | 'amount'>;

export type SVGProps = React.ComponentProps<'svg'>;

export type GiftColorType = 'gold' | 'red' | 'green' | 'blue';
export type CurrencyType = 'TON' | 'USDT' | 'ETH';

export interface IGift {
    id: number;
    name: string;
    color: GiftColorType;
    animationName: AnimationNameType;
    price: number;
    currency: CurrencyType;
    amount: number;
}

export interface IUser {
    id: number;
    user_id: number;
    name: string;
    gifts_received: number;
    pfp: string;
    place: number;
    language: 'ru' | 'en'
    is_premium: boolean
}

export interface IUserGift extends IGift{
    from: number
    amount_min: number
    amount_max: number
    bought_at: string
    sent_to: number
}