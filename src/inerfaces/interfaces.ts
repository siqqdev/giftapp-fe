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
    firstLastName: string;
}

export interface IReceivedGift {
    _id: string;
    name: GiftAnimationName;
    receivedDate: string;
    totalAmount: number;
    gift: IGift;
    owner: string;
    receivedBy: IUser
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
    user: IUser
}

export interface IBoughtGift {
    _id: string;
    name: string;
    purchaseDate: string;
    user: ITgUser;
    gift: IGift;
}

export interface IUserRecentAction {
    _id: string;
    type: 'BuyAction' | 'TransferAction';
    user: IUser,
    gift: IGift;
    giftName: GiftAnimationName;
    date: string;
    toUser: IUser;
}
