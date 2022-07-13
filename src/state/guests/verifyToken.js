import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

export const verifyToken = createAsyncThunk(
  'VERIFY_TOKEN',
  async (body, thunkAPI) => {
    const verified = await axios.post(
      `${BASE_URL}/users/verify-guest-token`,
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
