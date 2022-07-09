import { createElement } from '../render.js';

const createFilmsCountTemplate = (films) => {
  const {length} = films;
  const filmsAmount = length === 1 ? 'movie' : 'movies';
  return (`
    <p>${length} ${filmsAmount} inside</p>
  `);
};

export default class FilmsCountView {
  #element;
  #films;

  constructor (films) {
    this.#films = films;
  }

  get template() {
    return createFilmsCountTemplate(this.#films);
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

