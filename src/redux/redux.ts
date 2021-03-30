import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {filtersSlice} from './filters/slice';
import {cocktailsSlice} from './cocktails/slice';

const reducer = combineReducers({
  filters: filtersSlice.reducer,
  cocktails: cocktailsSlice.reducer,
});

const store = configureStore({reducer});
export default store;

export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;
