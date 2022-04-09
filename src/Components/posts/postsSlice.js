import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const homePage =  'https://www.reddit.com/.json'

const initialState = {
    posts: [], // Set to reddit home page posts, using the API.
    loading: false,
    hasError: false,
}; 

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (fetchURL = homePage) => {
      const response = await fetch(fetchURL);
      // The value we return becomes the `fulfilled` action payload
      const json = await response.json();
      const posts = json.data.children;
      return posts;
    }
  );

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchPosts.rejected, (state) => {
            state.loading = false;
            state.hasError = true;
          })
          .addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.hasError = false;
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.hasError = false;
            state.posts = action.payload;
          });
      },
});

export const selectLoading = (state) => state.posts.loading;
export const selectPosts = (state) => state.posts.posts;
export default postsSlice.reducer;