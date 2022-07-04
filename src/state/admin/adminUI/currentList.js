// import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
// import { fillingList } from '../../../utils/enviroment';

// export const setCurrentList = createAsyncThunk(
//   'SET_CURRENT_LIST',
//   (undefined, thunkAPI) => {
//     try {
//       const { listener } = thunkAPI.getState();
//       console.log('listener of thunkAPI', listener);
//       return fillingList[listener];
//     } catch (error) {
//       console.error('ADM_CURRENT_LIST_ERROR', error);
//     }
//   }
// );

// export const currentListReducer = createReducer(
//   {},
//   {
//     [setCurrentList.fulfilled]: (state, action) => action.payload,
//   }
// );
