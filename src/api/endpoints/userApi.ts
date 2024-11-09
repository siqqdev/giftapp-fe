import { baseApi } from "@/api/api.ts";
import {ITgUser, IUser, IUserWithTg} from "@/inerfaces/interfaces.ts";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserTgInfo: build.query<ITgUser, string>({
            query: (id) => ({
                url: `telegram/user/${id}`,
            })
        }),

        getMe: build.query<IUserWithTg, void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const userResult = await fetchWithBQ({
                    url: 'users/me',
                });

                if (userResult.error) {
                    return { error: userResult.error };
                }

                const user = userResult.data as IUser;

                try {
                    const tgResult = await fetchWithBQ({
                        url: `telegram/user/${user.id}`,
                    });

                    return {
                        data: {
                            ...user,
                            telegram: tgResult.data as ITgUser,
                        },
                    };
                } catch (error) {
                    return {
                        data: {
                            ...user,
                            telegram: undefined,
                        },
                    };
                }
            },
        }),

        getUserById: build.query<IUserWithTg, string>({
            async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
                const userResult = await fetchWithBQ({
                    url: `users/${id}`,
                });

                if (userResult.error) {
                    return { error: userResult.error };
                }

                const user = userResult.data as IUser;

                try {
                    const tgResult = await fetchWithBQ({
                        url: `telegram/user/${id}`,
                    });

                    return {
                        data: {
                            ...user,
                            telegram: tgResult.data as ITgUser,
                        },
                    };
                } catch (error) {
                    return {
                        data: {
                            ...user,
                            telegram: undefined,
                        },
                    };
                }
            },
        }),
        getUserActions: build.query({
            query: ({ page, limit }) => {
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString()
                });

                return {
                    url: `actions/user?${queryParams.toString()}`
                };
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const { page, ...rest } = queryArgs;
                return { endpointName, ...rest };
            },
            merge: (currentCache, newItems) => {
                if (currentCache) {
                    const existingIds = new Set(currentCache.items.map(item => item._id));

                    const newUniqueItems = newItems.items.filter(item => !existingIds.has(item._id));

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
        verifyPayments: build.mutation({
            query: (id) => ({
                url: `buy/check-pending`,
                method: 'POST',
            })
        })
    }),
});

export const {
    useGetMeQuery,
    useGetUserByIdQuery,
    useGetUserActionsQuery,
    useGetUserTgInfoQuery
} = userApi;