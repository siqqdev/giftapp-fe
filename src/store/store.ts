import { configureStore } from '@reduxjs/toolkit'
import {baseApi} from "@/api/api.ts";
import {tabBarSlice} from "@/store/slices/tabBarSlice.ts";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        tabBar: tabBarSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        baseApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
