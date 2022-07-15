import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';

export const getUsers = createAsyncThunk(
  'GET_USERS',
  async (_, thunkAPI) => {
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

export const updateUser = createAsyncThunk(
  'GET_USERS',
  async (body, thunkAPI) => {
    const thunk = thunkAPI.getState();
    const { token } = thunkAPI.getState();
    console.log(token)
    if (thunk.user.isAdmin) {
      try {
        const { data } = await axios.put(
          `http://localhost:3001/api/admin/edit-user/${body.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
    [getUsers.fulfilled]: (state, action) => action.payload,
  }
);
