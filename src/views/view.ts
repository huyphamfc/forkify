import icons from '../assets/images/icons.svg';

export default abstract class View {
  constructor(protected _container: HTMLElement) {}

  protected abstract _generateMarkup(): string;

  protected abstract _errMsg: string;

  private _renderMarkup(markup: string) {
    this._container.innerHTML = '';
    this._container.insertAdjacentHTML('afterbegin', markup);
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

  render() {
    const markup = this._generateMarkup();
    if (!markup) return this.renderErrorMessage();

    const previousDOM = Array.from(this._container.querySelectorAll('*'));
    const currentDOM = Array.from(
      document.createRange().createContextualFragment(markup).querySelectorAll('*'),
    );

    currentDOM.forEach((element: Element, i: number) => {
      if (element.isEqualNode(previousDOM[i])) return;
      if (
        !element.firstChild ||
        !element.firstChild.nodeValue ||
        element.firstChild.nodeValue.trim() === ''
      )
        return;

      currentDOM[i].textContent = element.textContent;
    });

    this._renderMarkup(markup);
  }
}
