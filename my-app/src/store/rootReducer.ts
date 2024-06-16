// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers can be added here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;