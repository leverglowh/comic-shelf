import { configureStore } from '@reduxjs/toolkit'

import authenticationReducer, { initialState as initialAuthentication } from './authentication';
import seriesReducer, { initialState as initialSeries } from 'src/entities/series/series.reducer';

const reducer = {
  authentication: authenticationReducer,
  series: seriesReducer
}

const preloadedState = {
  authentication: initialAuthentication,
  series: initialSeries
}

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
