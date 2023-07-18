import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchButtonData = createAsyncThunk(
  'button/fetchData', 
  async (_, thunkApi) => {
    
    const url = `${API_BASE_URL}/button/.json`;
    
    try {
      const response = await fetch(url);
      const buttonData = await response.json();      
      if (!buttonData) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(buttonData);
    }
    catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  buttonData: null,
  errorMessage: null,
};

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  extraReducers: {
    [fetchButtonData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchButtonData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.buttonData = payload;
      state.errorMessage = null;
    },
    [fetchButtonData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.buttonData = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchButtonData };
export const { reducer: buttonReducer} = buttonSlice;