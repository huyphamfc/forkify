import * as model from '../model';
import { recipeView } from '../views';

const bookmarkController = () => {
  model.addBookmark();
  recipeView.render();
};

export default bookmarkController;
