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
  bookmarks: SearchResult[];
}

export const state: State = {
  recipe: {} as Recipe,
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage,
  },
  bookmarks: [],
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

    state.recipe.bookmark = state.bookmarks.some((item) => item.id === id);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async () => {
  try {
    const result = await getJSON(`${API_URL}/?search=${state.search.query}`);

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

  return results.slice(startPage, endPage);
};

export const updateServings = (newServings: number) => {
  const currentServings = state.recipe.servings;
  state.recipe.ingredients.forEach((item) => (item.quantity *= newServings / currentServings));
  state.recipe.servings = newServings;
};

export const addBookmark = () => {
  state.recipe.bookmark = true;
  state.bookmarks.push(state.recipe);
};

export const removeBookmark = () => {
  const itemIndex = state.bookmarks.findIndex((item) => item.id === state.recipe.id);
  state.bookmarks.splice(itemIndex, 1);
  state.recipe.bookmark = false;
};
