import { getJSON } from './helpers';
import { Recipe } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const state = {
  recipe: {} as Recipe,
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
    console.error(err);
  }
};
