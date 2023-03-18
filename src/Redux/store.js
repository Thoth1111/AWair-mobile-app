import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { homeReducer } from './home/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    middleware: [thunkMiddleware],
  },
});

export default store;
