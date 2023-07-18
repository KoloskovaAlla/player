import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: '',
  data: null
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    dataFetching: (state) => {
      state.isLoading = true;
    },
    dataFetchingSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    dataFetchingError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { reducer: dataReducer } = dataSlice;
export const {
  dataFetching,
  dataFetchingSuccess,
  dataFetchingError,
} = dataSlice.actions;
