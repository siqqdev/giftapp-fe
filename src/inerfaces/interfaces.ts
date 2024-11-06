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

export type GiftAnimationName = 'Blue Star' | 'Delicious Cake' | 'Green Star' | 'Red Star'

export interface IGift {
    _id: string;
    name: GiftAnimationName;
    price: string;
    asset: CurrencyType;
    totalAmount: number;
    soldAmount: number;
}

export interface IUser {
    id: string;
    name: string;
    giftsReceived: number;
    pfp: string;
    place: number;
    is_premium: boolean;
    rank: number;
}

export interface IUserGift extends IGift{
    from: number
    amount_min: number
    amount_max: number
    bought_at: string
    sent_to: number
}

export interface IGiftAction {
    type: 'BuyAction' | 'SendAction';
    user: string
}