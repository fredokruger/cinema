import { createElement } from '../render.js';

//Отрисовка жанров, исходя из их количества
const createGenresListTemplate = (genres) => {
  let genreTemplate = '';
  for (const genre of genres) {
    genreTemplate += `<span class="film-details__genre">${genre}</span>`;
  }
  return genreTemplate;
};

const createFilmDetailsTemplate = (film) => {
  const {name, originalName, img, ageRating, rating, director, screenwritters, actors, releaseFullFormat, duration, country, genres, description, isWatchlist, isWatched, isFavorite} = film;

  const genresAmount = genres.length === 1 ? 'Genre' : 'Genres';

  const wathcListButtonClassName = isWatchlist ? 'film-details__control-button--active' : '';
  const watchedButtonClassName = isWatched ? 'film-details__control-button--active' : '';
  const favoriteButtonClassName = isFavorite ? 'film-details__control-button--active' : '';

  const watchListButtonContent = isWatchlist ? 'Already in watchlist' : 'Add to watchlist';
  const watchedButtonContent = isWatched ? 'Already watched' : 'Add to watched';
  const favoriteButtonContent = isFavorite ? 'Already in favorites' : 'Add to favorites';
  return (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${img}" alt="">

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${originalName}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwritters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseFullFormat}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genresAmount}</td>
                <td class="film-details__cell">
                  ${createGenresListTemplate(genres)}
              </tr>
            </table>
            <p class="film-details__film-description">

            ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${wathcListButtonClassName}" id="watchlist" name="watchlist">${watchListButtonContent}</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${watchedButtonClassName}" id="watched" name="watched">${watchedButtonContent}</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteButtonClassName}" id="favorite" name="favorite">${favoriteButtonContent}</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
      </div>
    </form>
  </section>
  `);
};

export default class FilmDetailsView {
  #element;
  #film;

  constructor (film) {
    this.#film = film;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film);
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
