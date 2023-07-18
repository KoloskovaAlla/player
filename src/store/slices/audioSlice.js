import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchAudio = createAsyncThunk(
  'player/audio',
  async (key, thunkApi) => {

    const url = `${API_BASE_URL}/podcastsSection/podcasts/${key}/src`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      let audio = new Audio(URL.createObjectURL(blob));
      if (!audio) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(audio);
    }
    catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  audio: null,
  errorMessage: null,
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  extraReducers: {
    [fetchAudio.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAudio.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.audio = payload;
      state.errorMessage = null;
    },
    [fetchAudio.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.audio = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchAudio };
export const { reducer: audioReducer } = audioSlice;