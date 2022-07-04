import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk(
  'GET_USERS',
  async (undefined, thunkAPI) => {
    const thunk = thunkAPI.getState();
    if (thunk.user.isAdmin) {
      try {
        const { data } = await axios.get(
          'http://localhost:3001/api/admin/get-all-users'
        );
        return data?.data;
      } catch (error) {
        console.error('/user/login ERROR ', error);
      }
    }
  }
);

export const usersReducer = createReducer(
  {},
  {
    [getUsers.fulfilled]: (state, action) => action.payload?.data,
  }
);
