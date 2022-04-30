import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://www.reddit.com/subreddits.json'

const initialState = {
    categories: [],
}

export const fetchCategories = createAsyncThunk(
    'categoryFilter/fetchCategories',
    async () => {
      const response = await fetch('https://www.reddit.com/subreddits.json');
      // The value we return becomes the `fulfilled` action payload
      const json = await response.json();
      const categories = json.data.children;
      return categories;
    }
  );

const filterSlice = createSlice({
    name: 'categoryFilter',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.rejected, (state) => {

          })
          .addCase(fetchCategories.pending, (state) => {
            
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
          });
    },
});

export const selectCategories = (state) => state.categoryFilter.categories;
export const {  } = filterSlice.actions;
export default filterSlice.reducer;