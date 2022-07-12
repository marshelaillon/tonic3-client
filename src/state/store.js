import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { currentListReducer } from './admin/adminUI/currentList';
import { listenerReducer } from './admin/adminUI/listener';
import { eventReducer } from './admin/eventController/event';
import { eventsReducer } from './admin/eventController/eventList';
import { guestsReducer } from './admin/guestController/guests';
import { usersReducer } from './admin/userController/users';
import { verifyGuestReducer } from './guests/verifyGuest';
import { verifyTokenReducer } from './guests/verifyToken';
import { sidebarReducer } from './UI/sidebar';
import { currentEventReducer } from './user/currentEvent';
import { userReducer } from './user/user';
import { userEventsReducer } from './user/userEvents';
import localStorageTokenReducer from './user/user';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  reducer: {
    //COMMON USERS
    user: userReducer,
    sidebar: sidebarReducer,
    verifiedGuest: verifyGuestReducer,
    verifiedToken: verifyTokenReducer,
    userEvents: userEventsReducer,
    currentEvent: currentEventReducer,
    //ADMIN USERS
    // currentList: currentListReducer,
    listener: listenerReducer,
    events: eventsReducer,
    guests: guestsReducer,
    users: usersReducer,
    token: localStorageTokenReducer,
  },
});

export default store;
