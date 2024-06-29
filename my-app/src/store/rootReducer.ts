// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlice';
import chatSlice from './slicers/chatSlice';
import secFilingsReducer from './slicers/secFilingsSlice';
import userProfileSlice from './slicers/userProfileSlice'; // Correct import name
import imagesSlice from './slicers/imagesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatSlice,
  secFilings: secFilingsReducer,
  userProfile: userProfileSlice, 
    images: imagesSlice,

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;