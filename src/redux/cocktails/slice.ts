import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCocktails} from '../../api/api';
import {Filters} from '../filters/slice';

export type InitialCocktailsStateType = {
  allCocktailsList: CocktailsListType[];
  cocktailsList: CocktailsListType[];
  loading: boolean;
};

export type ResponseCocktailType = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: number;
};

export type CocktailsListType = {
  title: null | Filters;
  data: ResponseCocktailType[];
};
const InitialState: InitialCocktailsStateType = {
  allCocktailsList: [],
  cocktailsList: [],
  loading: true,
};

export const getCocktailsList = createAsyncThunk(
  'getCocktails',
  async (filters: Filters[]) => {
    const promiseArray = filters.map(async item => {
      return await getCocktails(item);
    });
    const response = await Promise.all(promiseArray);
    const result: CocktailsListType[] = response.map((p, index) => {
      const obj: CocktailsListType = {
        title: filters[index],
        data: p,
      };
      return obj;
    });
    return result;
  },
);

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: InitialState,
  reducers: {
    addCocktailsToList: (state, {payload}: PayloadAction<number>) => ({
      ...state,
      cocktailsList: [...state.cocktailsList, state.allCocktailsList[payload]],
    }),
    removeCocktails: state => ({
      ...state,
      cocktailsList: [],
    }),
  },
  extraReducers: builder => {
    builder.addCase(getCocktailsList.pending, state => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getCocktailsList.fulfilled, (state, {payload}) => ({
      ...state,
      allCocktailsList: payload,
      loading: false,
    }));
  },
});

export const {addCocktailsToList, removeCocktails} = cocktailsSlice.actions;
