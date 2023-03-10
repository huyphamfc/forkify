import { recipeView, searchView, paginationView, bookmarksView } from './views';
import {
  recipeController,
  searchController,
  paginationController,
  servingController,
  bookmarkController,
  loadBookmarkController,
} from './controllers';

recipeView.addEventHandler(recipeController);
recipeView.addServingHandler(servingController);
recipeView.addBookmarkHandler(bookmarkController);
searchView.addSearchHandler(searchController);
paginationView.addClickHandler(paginationController);
bookmarksView.loadHandler(loadBookmarkController);
