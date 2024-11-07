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
    giftsReceived: number;
    rank: number;
}

export interface IReceivedGift {
    _id: string;
    name: GiftAnimationName;
    sendedDate: string;
    totalAmount: number;
    gift: IGift;
    owner: string;
    sendedBy: IUser;
}

interface IPhotoPaths {
    small?: string
    large?: string
}

export interface ITgUser {
    id: string;
    firstName: string;
    lastName?: string;
    username?: string;
    photosPath: IPhotoPaths
    isPremium: boolean;
}


export interface IUserWithTg extends IUser {
    telegram?: ITgUser;
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

