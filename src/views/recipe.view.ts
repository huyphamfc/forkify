import { state } from '../model';
import View from './view';
import { Ingredient } from '../types';
import icons from '../assets/images/icons.svg';

class RecipeView extends View {
  addEventHandler(handler: () => Promise<void>) {
    ['hashchange', 'load'].forEach((e) => window.addEventListener(e, handler));
  }

  addServingHandler(handler: () => void) {
    this._container.addEventListener('click', (e) => {
      if (!(e.target instanceof (HTMLElement && SVGElement))) return;

      const btn = e.target.closest('.btn--tiny') as HTMLButtonElement;
      if (!btn) return;

      const currentServings = state.recipe.servings;
      if (btn.classList.contains('btn--increase-servings')) {
        this._newServings = currentServings + 1;
      } else {
        this._newServings = currentServings - 1;
      }

      handler();
    });
  }

  addBookmarkHandler(handler: () => void) {
    this._container.addEventListener('click', (e) => {
      if (!(e.target instanceof (HTMLElement && SVGElement))) return;

      const btn = e.target.closest('.btn--bookmark') as HTMLButtonElement;
      if (!btn) return;

      handler();
    });
  }

  private _newServings: number = state.recipe.servings;
  get newServings() {
    if (this._newServings === state.recipe.servings) return 0;
    return this._newServings;
  }

  private _generateIngredientMarkup() {
    return state.recipe.ingredients
      .map(
        (item: Ingredient) => `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${item.quantity || ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${item.unit}</span>
              ${item.description}
            </div>
          </li>
        `,
      )
      .join('');
  }

  protected override _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${state.recipe.imgUrl}" alt="${state.recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${state.recipe.title}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            state.recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${state.recipe.servings}</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--decrease-servings">    
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>             
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="recipe__user-generated"></div>
        <button class="btn--round btn--bookmark">
          <svg>
            <use href="${icons}#icon-bookmark${state.recipe.bookmark ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._generateIngredientMarkup()}
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${state.recipe.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${state.recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  protected override _errMsg = 'We could not find that recipe. Please try another again.';
}

const recipeContainer = document.querySelector('.recipe') as HTMLDivElement;
export default new RecipeView(recipeContainer);
