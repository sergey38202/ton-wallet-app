import { createAsyncThunk } from '@reduxjs/toolkit';

import { ACTION_NAME_FETCH_BALANCE } from './constants';

export const fetchBalance = createAsyncThunk(
  ACTION_NAME_FETCH_BALANCE,
  async (address: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://toncenter.com/api/v2/getAddressBalance?address=${address}&api_key=${process.env.NEXT_PUBLIC_TON_API_KEY}`
      );
      const data = await response.json();
      if (data.ok) {
        return data.result / 1e9;
      } else {
        return rejectWithValue('Failed to fetch balance');
      }
    } catch (error: any) {
      return rejectWithValue('Error fetching balance: ' + error.message);
    }
  }
);
