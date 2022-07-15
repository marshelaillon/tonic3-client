import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

export const getUserEvents = createAsyncThunk(
  'GET_USER_EVENTS',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token;
      const { data } = await axios.get(`${BASE_URL}/users/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = data?.events?.filter(
        (item, i) => item?.id !== data.events[i + 1]?.id
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
