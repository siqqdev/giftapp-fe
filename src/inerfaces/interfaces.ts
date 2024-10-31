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

export interface IGift {
    id: number;
    animationData: string;
    color: 'gold' | 'red' | 'green' | 'blue';
    name: string;
    price: number;
    currency: 'TON' | 'USDT' | 'ETH';
    amount: number;
    maxAmount: number;
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