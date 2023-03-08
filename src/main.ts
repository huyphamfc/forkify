import { recipeView, searchView } from './views';
import { recipeController, searchController } from './controllers';

recipeView.addEventHandler(recipeController);
searchView.addSearchHandler(searchController);
