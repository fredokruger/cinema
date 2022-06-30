import { createElement } from '../render.js';

const createMostCommentedTemplate = () =>`
<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container"></div>
</section>
`;

export default class MostCommentedView {
  #element;

  get template() {
    return createMostCommentedTemplate();
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
