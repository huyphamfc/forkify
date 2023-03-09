import { recipeView, searchView, paginationView } from './views';
import {
  recipeController,
  searchController,
  paginationController,
  servingController,
} from './controllers';

recipeView.addEventHandler(recipeController);
recipeView.addServingHandler(servingController);
searchView.addSearchHandler(searchController);
paginationView.addClickHandler(paginationController);
