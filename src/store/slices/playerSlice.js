import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // isPlayer: localStorage.getItem('isPlayer') ?? false,
  isPlayer: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setIsPlayer: (state, action) => {
      state.isPlayer = action.payload;
    },
  },
});

export const { reducer: playerReducer } = playerSlice;

export const { setIsPlayer } = playerSlice.actions;
