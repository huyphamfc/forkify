import { state } from '../model';

class SearchView {
  private _searchForm = document.querySelector('.search') as HTMLFormElement;
  private _searchInput = this._searchForm.querySelector('.search__field') as HTMLInputElement;

  addSearchHandler(handler: () => Promise<void>) {
    this._searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._searchInput.value;

    if (query) {
      state.search.query = query;
      this._searchInput.value = '';
    }

    return query;
  }
}

export default new SearchView();
