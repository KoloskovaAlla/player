import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchContactsData = createAsyncThunk(
  'contacts/fetchData', 
  async (_, thunkApi) => {
    
    const url = `${API_BASE_URL}/contacts/.json`;
    
    try {
      const response = await fetch(url);
      const contactsData = await response.json();
      if (!contactsData) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(contactsData);
    }
    catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  contactsData: null,
  errorMessage: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContactsData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchContactsData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.contactsData = payload;
      state.errorMessage = null;
    },
    [fetchContactsData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.contactsData = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchContactsData };
export const { reducer: contactsReducer} = contactsSlice;