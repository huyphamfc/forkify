import { getSearchResultsPage } from '../model';
import View from './view';
import { SearchResult } from '../types';

class SearchResultsView extends View {
  private _generatePreviewMarkup(item: SearchResult) {
    const { id, title, publisher, imgUrl } = item;
    const hash = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${id === hash ? 'preview__link--active' : ''}" href="#${id}">
          <figure class="preview__fig">
            <img src="${imgUrl}" alt="${title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">
              ${title}
            </h4>
            <p class="preview__publisher">${publisher}</p>
          </div>
        </a>
      </li> 
    `;
  }

  protected override _generateMarkup() {
    return getSearchResultsPage()
      .map((item) => this._generatePreviewMarkup(item))
      .join('');
  }

  protected override _errMsg = 'No recipes found for your query. Please try again.';
}

const resultsContainer = document.querySelector('.results') as HTMLDivElement;
export default new SearchResultsView(resultsContainer);
