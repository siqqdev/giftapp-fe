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

export type GiftColor = 'gold' | 'red' | 'green' | 'blue';
export type Currency = 'TON' | 'USDT' | 'ETH';
export type AnimationName =
    | 'gift-delicious-cake'
    | 'gift-blue-star'
    | 'gift-green-star'
    | 'gift-red-star';

export interface IGift {
    id: number;
    name: string;
    color: GiftColor;
    animationName: AnimationName;
    price: number;
    currency: Currency;
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