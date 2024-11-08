import { baseApi } from "@/api/api.ts";
import {IActionHistoryItem, IGift, IReceivedGift, IUserGift} from "@/inerfaces/interfaces.ts";

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
            query: (id) => ({
                url: `buy`,
                method: 'POST',
                body: {giftId: id}
            })
        }),
        checkGiftPayment: build.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `buy/complete/${id}`,
                method: 'POST',
            })
        }),
        getGiftActions: build.query<IActionHistoryItem[], string>({
            query: (id) => ({
                url: `actions/gift/${id}`,
            })
        }),
        sendGift: build.mutation<{ success: boolean }, SendGiftRequest>({
            query: (id) => ({
                url: `transfer`,
                method: 'POST',
                body: {boughtGiftId: id}
            })
        }),
        getReceivedGifts: build.query<IReceivedGift[], void>({
            query: (id) => ({
                url: `users/${id}/received-gifts`,
            }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        receiveGift: build.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `transfer/complete`,
                method: 'POST',
                body: {actionIdHash: id}
            })
        })
    })
});

export const {
    useGetGiftsQuery,
    useGetBoughtGiftsQuery,
    useBuyGiftMutation,
    useGetGiftActionsQuery,
    useSendGiftMutation,
    useGetReceivedGiftsQuery,
    useCheckGiftPaymentMutation,
    useReceiveGiftMutation
} = giftApi;