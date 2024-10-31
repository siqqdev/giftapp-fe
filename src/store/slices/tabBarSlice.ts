import { createSlice } from '@reduxjs/toolkit';

interface TabBarState {
    isVisible: boolean;
}

const initialState: TabBarState = {
    isVisible: true,
};

export const tabBarSlice = createSlice({
    name: 'tabBar',
    initialState,
    reducers: {
        setTabBarVisibility: (state, action) => {
            state.isVisible = action.payload;
        },
    },
});

export const { setTabBarVisibility } = tabBarSlice.actions;
export default tabBarSlice.reducer;