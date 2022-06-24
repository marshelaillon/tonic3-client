import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { sidebarReducer } from './UI/sidebar';
import { userReducer } from './user/user';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
  },
});

export default store;
