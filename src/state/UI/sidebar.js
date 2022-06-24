import { createAction, createReducer } from '@reduxjs/toolkit';

export const toggleSidebar = createAction('SHOW_SIDEBAR');

export const sidebarReducer = createReducer(false, {
  [toggleSidebar]: (state, action) => !state,
});
