import { createElement } from '../render.js';

const createFilmsLoaderTemplate = () =>`
<section class="films-list">
  <h2 class="films-list__title">Loading...</h2>
</section>
`;

export default class FilmsLoaderView {
  #element;

  get template() {
    return createFilmsLoaderTemplate();
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
