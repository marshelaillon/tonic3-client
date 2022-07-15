import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

export const getUsers = createAsyncThunk(
  'GET_USERS',
  async (undefined, thunkAPI) => {
    const thunk = thunkAPI.getState();
    const { token } = thunkAPI.getState();
    if (thunk.user.isAdmin) {
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/get-all-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    [getUsers.fulfilled]: (state, action) => action.payload,
  }
);
