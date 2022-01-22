import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from './reducer';

export const store = configureStore({
  reducer: {
    analytic: analyticsReducer,
  },
});
