import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        screenSize: null,
        refresh: false
    },
    reducers: {
        setScreenSize: (state, action) => {
            state.screenSize = action.payload;
        },
        setRefresh: (state) => {
            state.refresh = !state.refresh;
        }
    },
});
export const { setScreenSize, setRefresh } = generalSlice.actions;
export const getScreenSize = (state) => state.general.screenSize;
export const getRefresh = (state) => state.general.refresh;
export default generalSlice.reducer;