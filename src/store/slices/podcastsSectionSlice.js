import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from 'constants/api';

const fetchPodcastsSectionData = createAsyncThunk(
  'podcastsSection/fetchData',
  async (_, thunkApi) => {

    const url = `${API_BASE_URL}/podcastsSection/.json`;

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
  podcastsSectionData: null,
  errorMessage: null,
};

const podcastsSectionSlice = createSlice({
  name: 'podcastsSection',
  initialState,
  extraReducers: {
    [fetchPodcastsSectionData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPodcastsSectionData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.podcastsSectionData = payload;
      state.errorMessage = null;
    },
    [fetchPodcastsSectionData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.podcastsSectionData = null;
      state.errorMessage = payload;
    },
  }
});

export { fetchPodcastsSectionData };
export const { reducer: podcastsSectionReducer } = podcastsSectionSlice;