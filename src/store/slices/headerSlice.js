import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchHeaderData = createAsyncThunk(
  'header/getData',
  async (_, thunkApi) => {
    const url = `${API_BASE_URL}/header/.json`;
    console.log(url)
    console.log(API_BASE_URL)

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(data);
    }
    catch (error) {
      console.error(error);
      const { message } = error;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  headerData: null,
  errorMessage: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  extraReducers: {
    [`${fetchHeaderData.pending}`]: (state) => {
      state.isLoading = true;
      state.headerData = null;
      state.errorMessage = '';
    },
    [`${fetchHeaderData.fulfilled}`]: (state, { payload }) => {
      state.isLoading = false;
      state.headerData = payload;
      state.errorMessage = '';
    },
    [`${fetchHeaderData.rejected}`]: (state, { payload }) => {
      state.isLoading = false;
      state.headerData = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchHeaderData };
export const { reducer: headerReducer } = headerSlice;
