import * as model from '../model';
import { recipeView } from '../views';

const bookmarkController = () => {
  if (model.state.recipe.bookmark) {
    model.removeBookmark();
  } else {
    model.addBookmark();
  }

  recipeView.render();
};

export default bookmarkController;
