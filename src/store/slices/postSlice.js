import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchPostData = createAsyncThunk(
  'post/fetchData',
  async (key, thunkApi) => {

    const url = `${API_BASE_URL}/postsPage/posts/${key}/.json`;

    try {
      const response = await fetch(url);
      let postsData = await response.json();
      if (!postsData) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(postsData);
    }
    catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  postData: null,
  errorMessage: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [fetchPostData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPostData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.postData = payload;
      state.errorMessage = null;
    },
    [fetchPostData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.post = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchPostData };
export const { reducer: postReducer } = postSlice;