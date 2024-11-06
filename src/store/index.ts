import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '@/store/slices/WalletSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
