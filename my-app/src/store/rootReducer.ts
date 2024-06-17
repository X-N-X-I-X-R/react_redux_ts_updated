// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlice';
import userprofile_slice from './slicers/userprofile_slice';
import chatSlice from './slicers/chatSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  userprofile: userprofile_slice,
  chat : chatSlice,

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
