import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // podcast: JSON.parse(localStorage.getItem('podcast')) ?? null,
  podcast: null,
  podcastId: localStorage.getItem('id') ?? null,
  podcastKey: localStorage.getItem('key') ?? null,
};

export const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    setPodcast: (state, action) => { state.podcast = action.payload },
    setPodcastId: (state, action) => { state.podcastId = action.payload },
    setPodcastKey: (state, action) => { state.podcastKey = action.payload }
  }
});

export const { reducer: podcastReducer } = podcastSlice;

export const { setPodcast, setPodcastId, setPodcastKey } = podcastSlice.actions;
