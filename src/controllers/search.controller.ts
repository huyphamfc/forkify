import { state, loadSearchResults } from '../model';
import { searchView, searchResultsView, paginationView } from '../views';

const searchController = async () => {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    searchResultsView.renderSpinner();

    await loadSearchResults();

    state.search.page = 1;
    searchResultsView.render();

    paginationView.render();
  } catch (err) {
    console.error(err);
  }
};

export default searchController;
