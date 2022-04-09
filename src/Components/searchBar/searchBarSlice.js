import { createSlice } from '@reduxjs/toolkit';

const initialState = "";

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