import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchHeaderData = createAsyncThunk(
  'header/fetchData', 
  async (_, thunkApi) => {
    
    const url = `${API_BASE_URL}/header/.json`;
    
    try {
      const response = await fetch(url);
      const headerData = await response.json();
      if (!headerData) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(headerData);
    }
    catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  headereData: null,
  errorMessage: null,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  extraReducers: {
    [fetchHeaderData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchHeaderData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.headerData = payload;
      state.errorMessage = null;
    },
    [fetchHeaderData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.headerData = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchHeaderData };
export const { reducer: headerReducer} = headerSlice;