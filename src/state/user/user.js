import {
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice,
  
} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/config.js';
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
  async (credentials, thunkAPI) => {
    console.log("esta es la thunkapi", thunkAPI);
    console.log("ESTAS SON LAS CREDENCIALES", credentials);
    try {

      const { data } = await axios.post(`${BASE_URL}/users/login`, credentials);
      console.log("la data de login", data);
      if (data.id) {
        console.log("entre", data);
        return data
      }
     /*  return thunkAPI.rejectWithValue(data) */
     throw new Error(data)
    } catch (error) {
      console.error('USER-LOGIN ERROR', error);
      return error
    }
  }
);

export const logoutUser = createAsyncThunk(
  'SEND_LOGOUT_REQUEST',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState();
      const response = await axios.get(
        'http://localhost:3001/api/users/logout',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {};
    } catch (error) {
      console.error('user/logout ERROR', error);
    }
  }
);

export const checkUser = createAsyncThunk(
  'CHECK_USER_BY_COOKIES',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState();
    try {
      const { data } = await axios.get(
        'http://localhost:3001/api/users/getMe',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('user/getMe ERROR', error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'UPDATE_REQUEST',
  async (updateBody, thunkAPI) => {
    const { token } = thunkAPI.getState();
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/users/update/${updateBody.id}`,
        updateBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

export const localStorageToken = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    setToken: (state, action) => action.payload,
  },
});

export default localStorageToken.reducer;
export const { setToken } = localStorageToken.actions;

export const userReducer = createReducer(
  {},
  {
    // [registerUser.fulfilled]: (state, action) => action.payload?.data,
    [registerUser.rejected]: (state, action) => {
      InvalidRegister();
      return action.payload?.data;
    },
    [loginUser.fulfilled]: (state, action) => action.payload,
    
    [loginUser.rejected]: (state, action) => {
      InvalidPassword();
      return action.payload?.data;
    },

    [logoutUser.fulfilled]: (state, action) => {
      localStorage.removeItem('vGuest');
      localStorage.removeItem('token');
      return action.payload;
    },

    [updateUser.fulfilled]: (state, action) => action.payload,
    [checkUser.fulfilled]: (state, action) => action.payload?.data || {},
    // [forgotPassword.fulfilled]: (state, action) => action.payload?.data,
  }
);
