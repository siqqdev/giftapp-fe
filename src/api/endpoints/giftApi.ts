import {baseApi} from "@/api/api.ts";

export const giftApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getGifts: build.query({
            query: () => ({
                url: 'gifts',
            })
        }),
        getBoughtGifts: build.query({
            query: () => ({
                url: 'users/bought-gifts',
            })
        }),
        buyGift: build.mutation({
            query: (body) => ({
                url: 'giftaction/buy',
                method: 'POST',
                body
            })
        }),
        getGiftActions: build.query({
            query: (id) => ({
                url: 'actions/gift/' + id,
            })
        }),
    })
});

export const {
    useGetGiftsQuery,
    useGetBoughtGiftsQuery,
    useBuyGiftMutation,
    useGetGiftActionsQuery
} = giftApi