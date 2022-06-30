import { createElement } from '../render.js';

const createCardsContainerTemplate = () =>`
<div class="films-list__container">
    </div>
  `;

export default class CardContainerView {
  #element;

  get template() {
    return createCardsContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

