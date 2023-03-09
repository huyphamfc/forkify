import { state } from '../model';
import View from './view';
import { SearchResult } from '../types';

class BookmarkView extends View {
  private _generateBookmarkMarkup(item: SearchResult) {
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

  protected override _errMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  protected override _generateMarkup() {
    if (state.bookmarks.length === 0) return '';

    return `
      <ul class="bookmarks__list">
        ${state.bookmarks.map((item) => this._generateBookmarkMarkup(item)).join('')}
      </ul>
    `;
  }
}

const bookmarksContainer = document.querySelector('.bookmarks') as HTMLDivElement;
export default new BookmarkView(bookmarksContainer);
