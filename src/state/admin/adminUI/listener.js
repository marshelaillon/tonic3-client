import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

export const listener = createAsyncThunk('ADMIN_UI_LISTENER', listen => {
  return listen;
});

export const listenerReducer = createReducer('', {
  [listener.fulfilled]: (state, action) => action.payload?.toLowerCase(),
});
