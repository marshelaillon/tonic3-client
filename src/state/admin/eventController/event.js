import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const addEvent = createAsyncThunk(
  'SET_EVENT',
  async (body, thunkAPI) => {
    const thunk = thunkAPI.getState();

    if (thunk.user.isAdmin) {
      try {
        const data = await axios.post(
          'http://localhost:3001/api/admin/add-event',
          body
        );
        return data?.data;
      } catch (error) {
        console.error('/add-event ERROR ', error);
      }
    }
  }
);

export const editEvent = createAsyncThunk('EDIT_EVENT', async body => {
  try {
    const editedEvent = await axios.put(
      'http://localhost:3001/api/admin/add-event'
    );
  } catch (error) {
    console.error('/add-event ERROR', error);
  }
});

export const eventReducer = createReducer(
  {},
  {
    [addEvent.fulfilled]: (state, action) => action.payload?.data,
    [editEvent.fulfilled]: (state, action) => action.payload?.data,
  }
);
