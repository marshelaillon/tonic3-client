import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';



export const addEvent = createAsyncThunk(
  'ADD_EVENT',
  async (body, thunkAPI) => {
    const thunk = thunkAPI.getState();
    const { token } = thunkAPI.getState();

    if (thunk.user.isAdmin) {
      try {
        const data = await axios.post(`${BASE_URL}/admin/add-event`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data?.data;
      } catch (error) {
        console.error('/add-event ERROR ', error);
      }
    }
  }
);

export const editEvent = createAsyncThunk('EDIT_EVENT', async (body, thunkAPI) => {
  const { token } = thunkAPI.getState()
  console.log('BODY Q LLEGA EDIT EVENT', body);
  try {
    const data = await axios.put(
      `${BASE_URL}/admin/edit-event/${body.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error('/EDIT-event ERROR', error);
  }
});

export const eventReducer = createReducer(
  {},
  {
    [addEvent.fulfilled]: (state, action) => {
      localStorage.setItem('event', JSON.stringify(action.payload?.data));
      return action.payload?.data;
    },
    [editEvent.fulfilled]: (state, action) => action.payload?.data,
  }
);
