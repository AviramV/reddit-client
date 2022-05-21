import { createSlice } from '@reduxjs/toolkit';

const location = new URLSearchParams(window.location.href);
const splitURL = location.toString().split('=');
const queryTerm = splitURL?.[1];

const initialState = queryTerm || "";

const searchBarSlice = createSlice({
    name: 'searchTerm',
    initialState,
    reducers: {
        setTerm: (state, action) => state = action.payload
    }
});

export const selectSearchTerm = (state) => state.searchTerm;
export const { setTerm } = searchBarSlice.actions;
export default searchBarSlice.reducer;