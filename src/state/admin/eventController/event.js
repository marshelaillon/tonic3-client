import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const addEvent = createAsyncThunk(
  'ADD_EVENT',
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

// export const setEvent = createAsyncThunk(
//   'SET_EVENT',
//   async (body, thunkAPI) => {
//     const thunk = thunkAPI.getState();
//     try {
//       const event = await JSON.parse(localStorage.getItem('event'));
//       return event;
//     } catch (error) {
//       console.error('/set-event ERROR ', error);
//     }
//   }
// );

export const editEvent = createAsyncThunk('EDIT_EVENT', async body => {
  console.log("BODY Q LLEGA EDIT EVENT", body)
  try {
    const data = await axios.put(
      `http://localhost:3001/api/admin/edit-event/${body.id}`, body
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
