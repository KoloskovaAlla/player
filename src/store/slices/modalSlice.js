import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // isPlayer: localStorage.getItem('isPlayer') ?? false,
  isModalOpen: false,
  isModalActive: false,
};

export const modalSlice = createSlice({
  name: 'modalPlayer',
  initialState,
  reducers: {
    setIsModalActive: (state, action) => {
      state.isModalActive = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { reducer: modalReducer } = modalSlice;

export const { setIsModalActive, setIsModalOpen } = modalSlice.actions;
