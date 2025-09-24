
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { stayeasyApi } from '../services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [stayeasyApi.reducerPath]: stayeasyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stayeasyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
