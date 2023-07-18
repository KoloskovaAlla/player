import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => localStorage.getItem('theme') ?? 'light';

const initialState = {
  theme: getTheme()
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme === 'dark'
        ? state.theme = 'light'
        : state.theme = 'dark';
    }
  }
});

export const { reducer: themeReducer } = themeSlice;
export const { toggleTheme } = themeSlice.actions;