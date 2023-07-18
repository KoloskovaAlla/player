import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // isPlayer: localStorage.getItem('isPlayer') ?? false,
  duration: null,
  currentTime: null,
  progress: null,
};

export const playerControlsSlice = createSlice({
  name: 'playerControls',
  initialState,
  reducers: {
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { reducer: playerControlsReducer } = playerControlsSlice;

export const { setDuration, setCurrentTime, setProgress } = playerControlsSlice.actions;
