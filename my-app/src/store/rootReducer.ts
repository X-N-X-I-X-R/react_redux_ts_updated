// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlice';
import chatSlice from './slicers/chatSlice';
import secFilingsReducer from './slicers/secFilingsSlice';
import userProfileSlice from './slicers/userProfileSlice'; // Correct import name
import imagesSlice from './slicers/imagesSlice';
import albumSlice from './slicers/albumSlice';
import websocketSlice from './slicers/websocketSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatSlice,
  secFilings: secFilingsReducer,
  userProfile: userProfileSlice, 
    images: imagesSlice,
    albums:albumSlice,
      websocket: websocketSlice,



});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;