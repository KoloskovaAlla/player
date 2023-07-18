import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
};

export const playingSlice = createSlice({
  name: 'playing',
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { reducer: playingReducer } = playingSlice;

export const { setIsPlaying } = playingSlice.actions;