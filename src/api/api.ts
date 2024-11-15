import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {config} from "@/config/config.ts";

export const api_url = config.backend_url;
const authHeader =
    window.Telegram?.WebApp.initData
    ||
    "query_id=AAG2VzsQAAAAALZXOxDZnISX&user=%7B%22id%22%3A272324534%2C%22first_name%22%3A%22qqi%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22qqillqill%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1731055064&hash=860ff6b56d2cc683bc61964244ded954946ecbe841a01a16a7fa831c32d61c2e"

const baseQuery = fetchBaseQuery({
    baseUrl: api_url,
    prepareHeaders: (headers, {endpoint}) => {
        if (authHeader) {
            headers.set('auth', `${authHeader}`);
        }
        return headers;
    }
});

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: (build) => ({}),
});