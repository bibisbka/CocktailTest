import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getFilters} from '../../api/api';

export type Filters =
  | 'Ordinary Drink'
  | 'Cocktail'
  | 'Milk / Float / Shake'
  | 'Other/Unknown'
  | 'Cocoa'
  | 'Shot'
  | 'Coffee / Tea'
  | 'Homemade Liqueur'
  | 'Punch / Party Drink'
  | 'Beer'
  | 'Soft Drink / Soda';

export type FilterListObj = {
  strCategory: Filters;
  active: boolean;
};

export type FilterListType = FilterListObj[];

export type InitialFiltersStateType = {
  filtersList: FilterListType;
  indexes: number[];
  loading: boolean;
  currentIndex: number;
};

const InitialState: InitialFiltersStateType = {
  filtersList: [],
  indexes: [],
  loading: true,
  currentIndex: 0,
};

export const getFiltersList = createAsyncThunk('getFilters', async () => {
  const response = await getFilters();
  const data: FilterListType = response.map((item: {item: FilterListObj}) => {
    return Object.assign({}, item, {active: true});
  });
  return data;
});

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: InitialState,
  reducers: {
    applyFilters: (state, {payload}: PayloadAction<FilterListType>) => ({
      ...state,
      filtersList: payload,
    }),
    setIndexArray: state => ({
      ...state,
      indexes: state.filtersList
        .map((f, index) => {
          if (f.active) {
            return index;
          }
          return -1;
        })
        .filter(val => val > -1),
    }),
    setInitialIndex: state => ({
      ...state,
      currentIndex: 0,
    }),
    setCurrentIndex: (state, {payload}: PayloadAction<number>) => ({
      ...state,
      currentIndex: payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(getFiltersList.pending, state => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getFiltersList.fulfilled, (state, {payload}) => ({
      ...state,
      filtersList: [...state.filtersList, ...payload],
      loading: false,
    }));
  },
});

export const {
  applyFilters,
  setIndexArray,
  setInitialIndex,
  setCurrentIndex,
} = filtersSlice.actions;
