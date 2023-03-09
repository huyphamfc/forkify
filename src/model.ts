/* eslint-disable no-useless-catch */
import { getJSON } from './helpers';
import { Recipe, SearchResult } from './types';

const API_URL = import.meta.env.VITE_API_URL;
const resultsPerPage = import.meta.env.VITE_RESULTS_PER_PAGE;

interface State {
  recipe: Recipe;
  search: {
    query: string;
    results: SearchResult[];
    page: number;
    resultsPerPage: number;
  };
}

export const state: State = {
  recipe: {} as Recipe,
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage,
  },
};

export const loadRecipe = async (id: string) => {
  try {
    const result = await getJSON(`${API_URL}/${id}`);

    const { recipe } = result.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imgUrl: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async (query: string) => {
  try {
    state.search.query = query;

    const result = await getJSON(`${API_URL}/?search=${query}`);

    const { recipes } = result.data;

    state.search.results = recipes.map(
      (item: { id: number; title: string; publisher: string; image_url: string }) => ({
        id: item.id,
        title: item.title,
        publisher: item.publisher,
        imgUrl: item.image_url,
      }),
    );
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = () => {
  const { page, results, resultsPerPage } = state.search;

  const startPage = (page - 1) * resultsPerPage;
  const endPage = page * resultsPerPage;

  state.search.page = page;

  return results.slice(startPage, endPage);
};
