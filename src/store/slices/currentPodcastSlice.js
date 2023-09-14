import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // podcast: JSON.parse(localStorage.getItem('podcast')) ?? null,
  podcast: null,
  podcastId: localStorage.getItem('id') ?? null,
  podcastKey: localStorage.getItem('key') ?? null,
};

export const currentPodcastSlice = createSlice({
  name: 'currentPodcast',
  initialState,
  reducers: {
    setPodcast: (state, action) => { state.podcast = action.payload },
    setPodcastId: (state, action) => { state.podcastId = action.payload },
    setPodcastKey: (state, action) => { state.podcastKey = action.payload }
  }
});

export const { reducer: currentPodcastReducer } = currentPodcastSlice;

export const { setPodcast, setPodcastId, setPodcastKey } = currentPodcastSlice.actions;
