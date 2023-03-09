import icons from '../assets/images/icons.svg';
import { state } from '../model';
import View from './view';

class PaginationView extends View {
  addClickHandler(handler: () => void) {
    this._container.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return;

      const btn = e.target.closest('.btn--inline') as HTMLButtonElement;
      if (!btn) return;

      if (btn.classList.contains('pagination__btn--next')) {
        state.search.page++;
      } else {
        state.search.page--;
      }

      handler();
    });
  }

  protected override _errMsg = '';

  protected override _generateMarkup() {
    const { page, results, resultsPerPage } = state.search;
    const numberOfPages = Math.ceil(results.length / resultsPerPage);

    if (numberOfPages <= 1) return ' ';

    if (page === 1) {
      return `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg> 
        </button>
      `;
    }

    if (page === numberOfPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `;
    }

    return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

const paginationContainer = document.querySelector('.pagination') as HTMLDivElement;
export default new PaginationView(paginationContainer);
