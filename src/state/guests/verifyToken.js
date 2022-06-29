import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyToken = createAsyncThunk(
  'VERIFY_TOKEN',
  async (body, thunkAPI) => {
    const { verifiedToken } = thunkAPI.getState();

    const verified = await axios.post(
      'http://localhost:3001/api/guests/verify-token',
      body
    );
    return verified?.data;
  }
);

export const verifyTokenReducer = createReducer(false, {
  [verifyToken.fulfilled]: (state, action) => action.payload?.data,
  [verifyToken.rejected]: (state, action) => {
    return false;
  },
});
