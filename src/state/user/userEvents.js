import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserEvents = createAsyncThunk(
  'GET_USER_EVENTS',
  async (body, thunkAPI) => {
    const thunk = thunkAPI.getState();
    try {
      const { data } = await axios.get(
        'http://localhost:3001/api/users/events'
      );
      const filtered = data.events.filter(
        (item, i) => item.id !== data.events[i + 1]?.id
      );
      return { events: filtered, leftTime: data.leftTime };
    } catch (error) {
      console.error('/set-event ERROR ', error);
    }
  }
);

export const userEventsReducer = createReducer(
  {},
  {
    [getUserEvents.fulfilled]: (state, action) => action.payload,
  }
);
