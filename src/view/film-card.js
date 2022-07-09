import {getConvertedString, MAX_LENGTH_DESCRIPTION_STRING_TO_FILM_CARD} from '../util.js';
import { createElement } from '../render.js';

const createFilmCardTemplate = (film) => {
  const {id, name, rating, releaseYear, duration, genres, img, description, comments, isWatchlist, isWatched, isFavorite} = film;
  const wathcListClassName = isWatchlist ? 'film-card__controls-item--active' : '';
  const watchedClassName = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--active' : '';
  const convertedDescription = getConvertedString(description, MAX_LENGTH_DESCRIPTION_STRING_TO_FILM_CARD);
  const commentAmount = comments.length === 1 ? '1 comment' : `${comments.length} comments`;
  return (`
<article id ="${id}" class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${img}" alt="" class="film-card__poster">
    <p class="film-card__description">${convertedDescription}</p>
    <span class="film-card__comments">${commentAmount}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${wathcListClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
  </div>
</article>
`);
};

export default class FilmCardView {
  #element;
  #film;
  constructor (film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
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
