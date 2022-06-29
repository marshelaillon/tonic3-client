import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { verifyGuestReducer } from './guests/verifyGuest';
import { verifyTokenReducer } from './guests/verifyToken';
import { sidebarReducer } from './UI/sidebar';
import { userReducer } from './user/user';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    verifiedGuest: verifyGuestReducer,
    verifiedToken: verifyTokenReducer,
  },
});

export default store;
