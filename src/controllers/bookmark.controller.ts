import * as model from '../model';
import { bookmarksView, recipeView } from '../views';

const bookmarkController = () => {
  if (model.state.recipe.bookmark) {
    model.removeBookmark();
  } else {
    model.addBookmark();
  }

  recipeView.render();
  bookmarksView.render();
};

export default bookmarkController;
