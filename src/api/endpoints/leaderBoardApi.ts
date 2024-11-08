import {baseApi} from "@/api/api.ts";

export const leaderBoardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getLeaderboard: build.query({
            query: ({ page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString()
                });

                return {
                    url: `users/leaderboard?${queryParams.toString()}`
                };
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const { page, ...rest } = queryArgs;
                return { endpointName, ...rest };
            },
            merge: (currentCache, newItems) => {
                if (currentCache) {
                    const existingIds = new Set(currentCache.items.map(item => item.id));

                    const newUniqueItems = newItems.items.filter(item => !existingIds.has(item.id));

                    return {
                        ...currentCache,
                        items: [...currentCache.items, ...newUniqueItems],
                        total: newItems.total
                    };
                }
                return newItems;
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.page !== previousArg?.page;
            }
        }),
    }),
})

export const {
    useGetLeaderboardQuery,
} = leaderBoardApi