import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { eventReducer } from './admin/eventController/event';
import { guestsReducer } from './admin/guestController/guests';
// import { captchaReducer } from './captcha/captcha';
import { verifyGuestReducer } from './guests/verifyGuest';
import { verifyTokenReducer } from './guests/verifyToken';
import { sidebarReducer } from './UI/sidebar';
import { userReducer } from './user/user';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    // captcha: captchaReducer,
    sidebar: sidebarReducer,
    verifiedGuest: verifyGuestReducer,
    verifiedToken: verifyTokenReducer,
    currentEvent: eventReducer,
    guests:guestsReducer,
  },
});

export default store;
