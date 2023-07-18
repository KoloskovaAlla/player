import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchHomePageData = createAsyncThunk(
  'homePage/fetchData',
  async (_, thunkApi) => {

    const url = `${API_BASE_URL}/homepage/.json`;

    try {
      const response = await fetch(url);
      let homePageData = await response.json();
      if (!homePageData) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(homePageData);
    }
    catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  homePageData: null,
  errorMessage: null,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  extraReducers: {
    [fetchHomePageData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchHomePageData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.homePageData = payload;
      state.errorMessage = null;
    },
    [fetchHomePageData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.homePageData = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchHomePageData };
export const { reducer: homePageReducer } = homePageSlice;