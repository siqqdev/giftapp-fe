import { baseApi } from "@/api/api.ts";
import {IActionHistoryItem, IGift, IUserGift} from "@/inerfaces/interfaces.ts";

interface BuyGiftRequest {
    giftId: string;
    amount: number;
}

interface SendGiftRequest {
    giftId: string;
    userId: number;
    amount: number;
}

export const giftApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getGifts: build.query<IGift[], void>({
            query: () => ({
                url: 'gifts',
            })
        }),
        getBoughtGifts: build.query<IUserGift[], void>({
            query: () => ({
                url: 'users/bought-gifts',
            })
        }),
        buyGift: build.mutation<{ success: boolean }, BuyGiftRequest>({
            query: (body) => ({
                url: `buy`,
                method: 'POST',
                body
            })
        }),
        getGiftActions: build.query<IActionHistoryItem[], string>({
            query: (id) => ({
                url: `actions/gift/${id}`,
            })
        }),
        sendGift: build.mutation<{ success: boolean }, SendGiftRequest>({
            query: (body) => ({
                url: `transfer`,
                method: 'POST',
                body
            })
        }),
        getReceivedGifts: build.query<IUserGift[], void>({
            query: (id) => ({
                url: `users/${id}/received-gifts`,
            })
        }),
    })
});

export const {
    useGetGiftsQuery,
    useGetBoughtGiftsQuery,
    useBuyGiftMutation,
    useGetGiftActionsQuery,
    useSendGiftMutation,
    useGetReceivedGiftsQuery
} = giftApi;