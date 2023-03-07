import icons from '../assets/images/icons.svg';
import { Ingredient, Recipe } from '../types';

class RecipeView {
  private _containerElement = document.querySelector('.recipe');
  private _recipe!: Recipe;
  private _errMsg = 'We could not find that recipe. Please try another again.';

  private _generateIngredientMarkup() {
    return this._recipe.ingredients
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

  private _generateRecipeMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._recipe.imgUrl}" alt="${this._recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._recipe.title}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._recipe.servings}</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
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
        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
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
          <span class="recipe__publisher">${this._recipe.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._recipe.sourceUrl}"
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

  private _renderMarkup(markup: string) {
    if (!this._containerElement) return;

    this._containerElement.innerHTML = '';
    this._containerElement.insertAdjacentHTML('afterbegin', markup);
  }

  addEventHandler(handler: () => Promise<void>) {
    ['hashchange', 'load'].forEach((e) => window.addEventListener(e, handler));
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._renderMarkup(markup);
  }

  renderMessage(message = '') {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._renderMarkup(markup);
  }

  renderErrorMessage(message: string = this._errMsg) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._renderMarkup(markup);
  }

  render(recipe: Recipe) {
    this._recipe = recipe;
    const markup = this._generateRecipeMarkup();
    this._renderMarkup(markup);
  }
}

export default new RecipeView();
