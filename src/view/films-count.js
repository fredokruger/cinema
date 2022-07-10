import AbstractView from './abstract-view.js';

const createFilmsCountTemplate = (films) => {
  const {length} = films;
  const filmsAmount = length === 1 ? 'movie' : 'movies';
  return (`
    <p>${length} ${filmsAmount} inside</p>
  `);
};

export default class FilmsCountView extends AbstractView {
  #films;

  constructor (films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilmsCountTemplate(this.#films);
  }
}

