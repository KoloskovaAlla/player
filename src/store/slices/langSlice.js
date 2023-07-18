import { createSlice } from '@reduxjs/toolkit';

const getLang = () => localStorage.getItem('lang') ?? 'en';

const initialState = {
  lang: getLang()
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    }
  }
});

export default langSlice.reducer;
export const { setLang } = langSlice.actions;