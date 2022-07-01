import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { WithoutInvitation } from '../../utils/sweetAlerts';

export const verifyGuest = createAsyncThunk('VERIFY_GUEST', async body => {
  const { data } = await axios.post(
    'http://localhost:3001/api/users/verify-email',
    body
  );
  return data;
});

export const verifyGuestReducer = createReducer(
  {},
  {
    [verifyGuest.fulfilled]: (state, action) => action.payload?.data,
    [verifyGuest.rejected]: (state, action) => {
      WithoutInvitation();
      return action.payload?.data;
    },
  }
);
