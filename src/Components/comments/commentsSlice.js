import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
    loading: false,
    hasError: false
};

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (permalink) => {
      const response = await fetch(`https://www.reddit.com${permalink}.json`);
      // The value we return becomes the `fulfilled` action payload
      const json = await response.json();
      const comments = json[1].data.children;
      return comments;
    }
  );

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments = []
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchComments.rejected, (state) => {
            state.loading = false;  
            state.hasError = true;
          })
          .addCase(fetchComments.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false;
            state.hasError = false;
            state.comments = action.payload;
          });
    },
});

export const selectComments = (state) => state.comments.comments;
export const selectLoading = (state) => state.comments.loading;
export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;