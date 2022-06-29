import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyGuest = createAsyncThunk('VERIFY_GUEST', async body => {
  const { data } = await axios.post(
    'http://localhost:3001/api/guests/verify-guest',
    body
  );
  return data;
});

export const verifyGuestReducer = createReducer(
  {},
  {
    [verifyGuest.fulfilled]: (state, action) => action.payload?.data,
  }
);
