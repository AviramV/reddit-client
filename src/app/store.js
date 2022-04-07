import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../Components/posts/postsSlice';
import commentsReducer from '../Components/comments/commentsSlice';
import searchTermReducer from '../Components/searchBar/searchBarSlice';
import categoryFilterReducer from '../Components/filter/filterSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    searchTerm: searchTermReducer,
    categoryFilter: categoryFilterReducer
  },
});