import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmailList = createAsyncThunk(
  'GET_GUEST_EMAIL_LIST',
  async () => {
    const { data } = await axios.get(
      'http://localhost:3001/api/guests/get-list'
    );
    if (data) return data;
  }
);

export const getEmailListReducer = createReducer([], {
  [getEmailList.fulfilled]: (state, action) => action.payload.data,
});
