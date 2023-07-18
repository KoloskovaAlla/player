import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 currentPage: ''
}

export const currentPageSlice = createSlice( {
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {state.currentPage = action.payload}
  }
})

export const {reducer: currentPageReducer} = currentPageSlice

export const {setCurrentPage} = currentPageSlice.actions

