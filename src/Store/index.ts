import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import matchReducer from './Match/matchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    match: matchReducer,
  },
});
