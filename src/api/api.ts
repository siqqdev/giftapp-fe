import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {config} from "@/config/config.ts";

export const api_url = config.backend_url;
const authHeader =
    window.Telegram?.WebApp.initData
    ||
    "user=%7B%22id%22%3A5417816708%2C%22first_name%22%3A%22sssssss%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22ayosiqq%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5864444131071715272&chat_type=private&auth_date=1730941794&hash=9c46fa60b357dc1f6c7fe4737a4165cf7a83865fad04eb652ae652f25fbded39"

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