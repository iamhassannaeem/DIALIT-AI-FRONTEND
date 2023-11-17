// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import isAdminSlice from './slices/isAdminSlice';
import thunk from 'redux-thunk'; // Import Redux Thunk

const store = configureStore({
  reducer: {
    auth: authReducer,
    isAdmin: isAdminSlice,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
