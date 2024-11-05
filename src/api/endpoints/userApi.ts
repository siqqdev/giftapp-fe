import {baseApi} from "@/api/api.ts";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query({
            query: () => ({
                url: 'users/me',
            })
        }),
        getUserById: build.query({
            query: (id) => ({
                url: `users/${id}`,
            })
        }),
        getUserActions: build.query({
            query: (id) => ({
                url: `actions/user`,
            })
        }),
    }),
})

export const {
    useGetMeQuery,
    useGetUserByIdQuery,
    useGetUserActionsQuery
} = userApi