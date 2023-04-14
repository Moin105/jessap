import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/counter/authReducer';
import sopReducer from '../features/counter/sopReducer';
import userReducer from '../features/counter/userReducers';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    sops: sopReducer,
    users:userReducer
  },
});
