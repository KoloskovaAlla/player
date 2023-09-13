import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './slices/themeSlice';
import { homePageReducer } from './slices/homePageSlice';
import { podcastsReducer } from './slices/podcastsSlice';
import { playerReducer } from './slices/playerSlice';
import { playingReducer } from './slices/playingSlice';
import { audioReducer } from './slices/audioSlice';
import { currentPodcastReducer } from './slices/currentPodcastSlice';
import { modalReducer } from './slices/modalSlice';

const rootReducer = combineReducers({
  themeReducer,
  homePageReducer,
  podcastsReducer,
  playerReducer,
  playingReducer,
  audioReducer,
  currentPodcastReducer,
  modalReducer
});

export const store = configureStore({
  reducer: rootReducer
});
