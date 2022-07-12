import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { WithoutInvitation } from '../../utils/sweetAlerts';

export const verifyGuest = createAsyncThunk('VERIFY_GUEST', async body => {
  const { data } = await axios.post(
    'http://localhost:3001/api/users/verify-email',
    body
  );
  return { data: data.data, email: body.email };
});

export const setVerifiedGuest = createAsyncThunk(
  'SET_VERIFY_GUEST',
  async body => {
    const verifiedGuest = await JSON.parse(localStorage.getItem('vGuest'));

    return verifiedGuest;
  }
);

export const verifyGuestReducer = createReducer(
  {},
  {
    [verifyGuest.fulfilled]: (state, action) => {
      localStorage.setItem('vGuest', JSON.stringify(action.payload?.data));
    
      return action.payload;
    },
    [verifyGuest.rejected]: (state, action) => {
      WithoutInvitation();
      return action.payload?.data;
    },
    [setVerifiedGuest.fulfilled]: (state, action) => action.payload,
  }
);
