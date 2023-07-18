import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataReducer } from './slices/dataSlice';
import { themeReducer } from './slices/themeSlice';
import { headerReducer } from './slices/headerSlice';
import { postsReducer } from './slices/postsSlice';
import { postReducer } from './slices/postSlice';
import { contactsReducer } from './slices/contactsSlice';
import { buttonReducer } from './slices/buttonSlice';
import { homePageReducer } from './slices/homePageSlice';
import { podcastsSectionReducer } from './slices/podcastsSectionSlice';
import { podcastsReducer } from './slices/podcastsSlice';
import { playerReducer } from './slices/playerSlice';
import { playingReducer } from './slices/playingSlice';
import { audioReducer } from './slices/audioSlice';
import { currentPodcastReducer } from './slices/currentPodcastSlice';
import { modalReducer } from './slices/modalSlice';

const rootReducer = combineReducers({
  themeReducer,
  dataReducer,
  headerReducer,
  postsReducer,
  contactsReducer,
  postReducer,
  buttonReducer,
  homePageReducer,
  podcastsSectionReducer,
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
