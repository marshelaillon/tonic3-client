import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEvents = createAsyncThunk(
  'GET_EVENTS',
  async (undefined, thunkAPI) => {
    try {
      const thunk = thunkAPI.getState();
      if (thunk.user.isAdmin) {
        const { data } = await axios.get(
          'http://localhost:3001/api/admin/get-all-events'
        );
        return data;
      }
    } catch (error) {
      console.error('/get-all-events ERROR ', error);
    }
  }
);

export const eventsReducer = createReducer(
  {},
  {
    [getEvents.fulfilled]: (state, action) => action.payload?.data,
  }
);
