import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

export const setcurrentEvent = createAsyncThunk(
  'SET_CURRENT_EVENT',
  (undefined, thunkAPI) => {
    const thunk = thunkAPI.getState();
    console.log('futuro current event', thunk.userEvents[0]);
    return {
      event: thunk.userEvents.events[0],
      leftTime: thunk.userEvents.leftTime,
    };
  }
);

export const currentEventReducer = createReducer(
  {},
  {
    [setcurrentEvent.fulfilled]: (state, action) => action.payload,
  }
);
