import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchPodcastsData = createAsyncThunk(
  'podcasts/fetchData',
  async (_, thunkApi) => {

    const url = `${API_BASE_URL}/podcasts/.json`;

    try {
      const response = await fetch(url);
      const podcastsData = await response.json();
      if (!podcastsData) throw new Error('Failed to fetch');
      return thunkApi.fulfillWithValue(podcastsData);
    }
    catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  podcastsData: null,
  errorMessage: null,
};

const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  extraReducers: {
    [fetchPodcastsData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPodcastsData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.podcastsData = payload;
      state.errorMessage = null;
    },
    [fetchPodcastsData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.podcastsData = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchPodcastsData };
export const { reducer: podcastsReducer } = podcastsSlice;