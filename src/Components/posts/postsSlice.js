import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const homePage = 'https://www.reddit.com';
const searchQuery = 'search.json?q=';

const initialState = {
  posts: [], // Set to reddit home page posts, using the API.
  loading: true,
  error: {
    hasError: false,
    errorCode: null
  }
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ fetchBy, term } = {}, { rejectWithValue }) => {
    let fetchURL;
    switch (fetchBy) {
      case 'search':
        fetchURL = `${homePage}/${searchQuery}${term}`;
        break;
      case 'filter':
        fetchURL = `${homePage}/r/${term}.json`;
        break;

      default:
        fetchURL = `${homePage}/.json`
        break;
    }
    let status;
    try {
      const response = await fetch(fetchURL);
      status = response.status;
      // The value we return becomes the `fulfilled` action payload
      const json = await response.json();
      const posts = json.data.children;
      return posts;
    } catch (error) {
      // Becomes the `rejected` action payload
      return rejectWithValue(status); 
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error.hasError = true;
        state.error.errorCode = action.payload ?? 302;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error.hasError = false;
        state.error.errorCode = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error.hasError = false;
        state.error.errorCode = null;
        state.posts = action.payload;
      });
  },
});

export const selectLoading = (state) => state.posts.loading;
export const selectPosts = (state) => state.posts.posts;
export const selectError = (state) => state.posts.error;
export default postsSlice.reducer;