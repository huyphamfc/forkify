import { recipeView, searchView, paginationView } from './views';
import {
  recipeController,
  searchController,
  paginationController,
  servingController,
  bookmarkController,
} from './controllers';

recipeView.addEventHandler(recipeController);
recipeView.addServingHandler(servingController);
recipeView.addBookmarkHandler(bookmarkController);
searchView.addSearchHandler(searchController);
paginationView.addClickHandler(paginationController);
