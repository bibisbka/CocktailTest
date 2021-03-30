import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
  withCredentials: true,
});

export const getCocktails = (filter: string) => {
  return instance
    .get('filter.php', {params: {c: filter}})
    .then(response => response.data.drinks);
};

export const getFilters = () => {
  return instance
    .get('list.php', {params: {c: 'list'}})
    .then(response => response.data.drinks);
};
