import { recipeView, searchView, paginationView } from './views';
import { recipeController, searchController, paginationController } from './controllers';

recipeView.addEventHandler(recipeController);
searchView.addSearchHandler(searchController);
paginationView.addClickHandler(paginationController);
