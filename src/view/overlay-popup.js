import { createElement } from '../render.js';

const createPopupOverlayTemplate = () =>`
<div class="overlay"></div>
`;

export default class PopupOverlayView {
  #element;

  get template() {
    return createPopupOverlayTemplate();
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
