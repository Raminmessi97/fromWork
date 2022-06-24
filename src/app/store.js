import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import customOptionSlice from "../features/customOption/customOptionSlice";
import {servicesSlice} from "../features/services/servicesSlice";
import { servicesApi } from '../features/services/servicesApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customOption:customOptionSlice,
    services:servicesSlice,
    [servicesApi.reducerPath]:servicesApi.reducer
  },

  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(servicesApi.middleware)

});
