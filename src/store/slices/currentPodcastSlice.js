import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // podcast: JSON.parse(localStorage.getItem('podcast')) ?? null,
  podcast: null,
  id: localStorage.getItem('id') ?? null,
  key: localStorage.getItem('key') ?? null,
};

export const currentPodcastSlice = createSlice({
  name: 'currentPodcast',
  initialState,
  reducers: {
    setPodcast: (state, action) => { state.podcast = action.payload },
    setId: (state, action) => { state.id = action.payload },
    setKey: (state, action) => { state.key = action.payload }
  }
})


export const { reducer: currentPodcastReducer } = currentPodcastSlice;

export const { setPodcast, setId, setKey } = currentPodcastSlice.actions;
