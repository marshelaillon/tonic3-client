import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

export const addGuests = createAsyncThunk(
  'ADD_GUESTS',
  async (body, thunkAPI) => {
    console.log('esto llega al state del front', body);

    const thunk = thunkAPI.getState();
    if (thunk.user.isAdmin) {
      try {
        const { data } = await axios.post(`${BASE_URL}/admin/add-guest`, body);
      } catch (error) {
        console.error('/ADD-GUESTS ERROR ', error);
      }
    }
  }
);

export const getGuests = createAsyncThunk(
  'GET_GUESTS',
  async (undefined, thunkAPI) => {
    const thunk = thunkAPI.getState();
    if (thunk.user.isAdmin) {
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/get-all-guests`);
        console.log('REDUX GUESTS', data?.data);
        return data?.data;
      } catch (error) {
        console.error('/GET-ALL-GUESTS ERROR ', error);
      }
    }
  }
);

export const sendInvitations = createAsyncThunk(
  'SEND_INVITATIONS',
  async (undefined, thunkAPI) => {
    const thunk = thunkAPI.getState();
    if (thunk.user.isAdmin) {
      try {
        await axios.get(`${BASE_URL}/admin/send-invitations`);
      } catch (error) {
        console.error('send-invitations', error);
      }
    }
  }
);

export const guestsReducer = createReducer(
  {},
  {
    // [addGuests.fulfilled]: (state, action) => action.payload?.data,
    [getGuests.fulfilled]: (state, action) =>
      console.log('action.payload?.data', action.payload?.data),
  }
);
