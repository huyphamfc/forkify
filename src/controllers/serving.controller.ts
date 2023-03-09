import { updateServings } from '../model';
import { recipeView } from '../views';

const servingController = () => {
  const { newServings } = recipeView;
  if (!newServings) return;

  updateServings(newServings);

  recipeView.render();
};

export default servingController;
