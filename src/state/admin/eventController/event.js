import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

export const addEvent = createAsyncThunk(
  'ADD_EVENT',
  async (body, thunkAPI) => {
    const thunk = thunkAPI.getState();
    const form = new FormData();
    form.append('title', body.title);
    form.append('url', body.url);
    form.append('description', body.description);
    form.append('image', body.image);
    form.append('date', body.date);

    if (thunk.user.isAdmin) {
      try {
        const data = await axios.post(`${BASE_URL}/admin/add-event`, form, {
          headers: {
            Authorization: `Bearer ${thunk.token}`,
          },
        });
        return data?.data;
      } catch (error) {
        console.error('/add-event ERROR ', error);
      }
    }
  }
);

export const editEvent = createAsyncThunk(
  'EDIT_EVENT',
  async (body, thunkAPI) => {
    console.log('BODY Q LLEGA EDIT EVENT', body);
    try {
      const { token } = thunkAPI.getState();

      const data = await axios.put(
        `${BASE_URL}/admin/edit-event/${body.id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('/EDIT-event ERROR', error);
    }
  }
);

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
