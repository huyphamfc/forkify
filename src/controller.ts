import * as recipeModel from './model';
import { RecipeView } from './views';

const recipeContainer = document.querySelector('.recipe');

const recipeController = async () => {
  try {
    if (!recipeContainer) return;

    const id = window.location.hash.slice(1);
    if (!id) return;

    const recipeView = new RecipeView(recipeContainer);
    recipeView.renderSpinner();

    await recipeModel.loadRecipe(id);

    recipeView.render(recipeModel.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['load', 'hashchange'].forEach((event) => window.addEventListener(event, recipeController));
