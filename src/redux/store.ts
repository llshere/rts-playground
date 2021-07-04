import { configureStore } from '@reduxjs/toolkit';

import univListReducer from './univListSlice';

export const store = configureStore({
  reducer: { univList: univListReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
