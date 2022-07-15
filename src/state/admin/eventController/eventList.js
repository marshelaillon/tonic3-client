import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';


export const getEvents = createAsyncThunk('GET_EVENTS', async (_, thunkAPI) => {
  try {
    const thunk = thunkAPI.getState();
    const { token } = thunkAPI.getState();

    if (thunk.user.isAdmin) {
      const { data } = await axios.get(`${BASE_URL}/admin/get-all-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data?.data, 'OTRA COSA ');
      return data?.data;
    }
  } catch (error) {
    console.error('/get-all-events ERROR ', error);
  }
});

export const eventsReducer = createReducer(
  {},
  {
    [getEvents.fulfilled]: (state, action) => action.payload,
  }
);
