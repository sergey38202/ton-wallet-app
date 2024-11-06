import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchBalance } from '@/store/actions/WalletAction';

import { SLICE_NAME } from './constants';
import { IWalletState } from './types';

const initialState: IWalletState = {
  address: null,
  balance: 0,
  status: 'idle',
};

const walletSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    connectWalletStart(state) {
      state.status = 'loading';
    },
    connectWalletSuccess(state, action: PayloadAction<string>) {
      state.status = 'connected';
      state.address = action.payload;
    },
    disconnectWallet(state) {
      state.status = 'disconnected';
      state.address = null;
      state.balance = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { connectWalletStart, connectWalletSuccess, disconnectWallet } =
  walletSlice.actions;

export default walletSlice.reducer;
