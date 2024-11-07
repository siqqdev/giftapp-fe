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
            query: () => ({
                url: `actions/user`,
            })
        }),
    }),
});

export const {
    useGetMeQuery,
    useGetUserByIdQuery,
    useGetUserActionsQuery,
    useGetUserTgInfoQuery
} = userApi;