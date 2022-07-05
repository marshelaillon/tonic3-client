import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { InvalidPassword, InvalidRegister } from '../../utils/sweetAlerts';

export const registerUser = createAsyncThunk(
  'SEND_REGISTER_REQUEST',
  async registerBody => {
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/users/register',
        registerBody
      );
      return data;
    } catch (error) {
      console.error('/user/register ERROR ', error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'SEND_LOGIN_REQUEST',
  async credentials => {
    const { error, data } = await axios.post(
      'http://localhost:3001/api/users/login',
      credentials
    );
    if (!error) return data;
  }
);

export const logoutUser = createAsyncThunk('SEND_LOGOUT_REQUEST', async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/users/logout');
    return response.data;
  } catch (error) {
    console.error('user/logout ERROR', error);
  }
});

export const checkUser = createAsyncThunk('CHECK_USER_BY_COOKIES', async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/users/getMe');
    return data;
  } catch (error) {
    console.error('user/getMe ERROR', error);
  }
});

export const updateUser = createAsyncThunk(
  'UPDATE_REQUEST',
  async updateBody => {
    console.log('esto es el updatebody', updateBody);
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/users/update/${updateBody.id}`,
        updateBody
      );
      console.log('esta es la data del update', data);
      return data;
    } catch (error) {
      console.error('/user/update/:id ERROR ', error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'SEND_EMAIL_CHANGE_PASSWORD',
  async dataEmail => {
    try {
      const data = await axios.post(
        'http://localhost:3001/api/users/forgot-password',
        dataEmail
      );
      return data;
    } catch (error) {
      console.log('forgotPassword ERROR', error);
    }
  }
);

export const newPassword = createAsyncThunk(
  'UPDATE_NEW_PASSWORD',
  async dataPassword => {
    try {
      const data = await axios.post(
        `http://localhost:3001/api/users/${dataPassword.id}/new-password`,
        dataPassword
      );
      return data;
    } catch (error) {
      console.log('ESTO ES EL ERROR DE NEW ERROR', error);
    }
  }
);

export const userReducer = createReducer(
  {},
  {
    [registerUser.fulfilled]: (state, action) => action.payload?.data,
    [registerUser.rejected]: (state, action) => {
      InvalidRegister();
      return action.payload?.data;
    },
    [loginUser.fulfilled]: (state, action) => action.payload?.data,
    [loginUser.rejected]: (state, action) => {
      InvalidPassword();
      return action.payload?.data;
    },
    [logoutUser.fulfilled]: (state, action) => action.payload,
    [updateUser.fulfilled]: (state, action) => action.payload,
    [checkUser.fulfilled]: (state, action) => action.payload?.data,
    [forgotPassword.fulfilled]: (state, action) => action.payload?.data,
  }
);
