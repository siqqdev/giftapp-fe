import {baseApi} from "@/api/api.ts";

export const leaderBoardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getLeaderboard: build.query({
            query: (page=1, perPage=10) => ({
                url: `users/leaderboard?page=${page}&limit=${perPage}`,
            })
        }),
    }),
})

export const {
    useGetLeaderboardQuery,
} = leaderBoardApi