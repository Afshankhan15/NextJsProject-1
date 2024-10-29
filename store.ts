import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice'
// import chatReducer from './features/chatSlice';
import chatSlice from './features/chatSlice'
import userTableSlice from './features/userTableSlice'
import siteInfoSlice from './features/siteInfoSlice'
const store = configureStore({
  reducer: {
    // chat: chatReducer,
    chat: chatSlice,
    userTable: userTableSlice,
    counterSlice, // Add your slice reducer here
    siteInfoSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
