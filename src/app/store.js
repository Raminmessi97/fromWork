import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import customOptionSlice from "../features/customOption/customOptionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customOption:customOptionSlice
  },

});
