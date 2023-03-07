import * as recipeModel from './model';
import { recipeView } from './views';

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await recipeModel.loadRecipe(id);

    recipeView.render(recipeModel.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

export default recipeController;
