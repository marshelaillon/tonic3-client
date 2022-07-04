import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const addGuests = createAsyncThunk(
  'ADD_EVENT',
  async (body, thunkAPI) => {
    const thunk = thunkAPI.getState();
    // {eventId: eventid, emails: ["asda@asf.com"]}
    if (thunk.user.isAdmin) {
      try {
        const { data } = await axios.post(
          'http://localhost:3001/api/admin/add-event',
          body
        );
        console.log(data);
      } catch (error) {
        console.error('/user/login ERROR ', error);
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
        const { data } = await axios.get(
          'http://localhost:3001/api/admin/get-all-guests'
        );
        return data?.data;
      } catch (error) {
        console.error('/user/login ERROR ', error);
      }
    }
  }
);

export const guestsReducer = createReducer(
  {},
  {
    [addGuests.fulfilled]: (state, action) => action.payload?.data,
    [getGuests.fulfilled]: (state, action) => action.payload?.data,
  }
);
