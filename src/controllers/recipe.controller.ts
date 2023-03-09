import * as recipeModel from '../model';
import { recipeView, searchResultsView, bookmarksView } from '../views';

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await recipeModel.loadRecipe(id);

    if (recipeModel.state.search.results.length !== 0) searchResultsView.render();

    recipeView.render();
    bookmarksView.render();
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

export default recipeController;
