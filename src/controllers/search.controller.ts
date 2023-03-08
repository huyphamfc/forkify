import { loadSearchResults } from '../model';
import { searchView, searchResultsView } from '../views';

const searchController = async () => {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    searchResultsView.renderSpinner();

    await loadSearchResults(query);

    searchResultsView.render();
  } catch (err) {
    console.error(err);
  }
};

export default searchController;
