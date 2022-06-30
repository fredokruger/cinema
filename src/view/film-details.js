const createGenresList = (genres) => {
  let textMarkupToGenresList = '';
  for (const genre of genres) {
    textMarkupToGenresList += `<span class="film-details__genre">${genre}</span>`;
  }
  return textMarkupToGenresList;
};

export const createFilmDetails = (film) =>`

<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${film.img}" alt="">

          <p class="film-details__age">${film.ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.name}</h3>
              <p class="film-details__title-original">Original: ${film.originalName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.screenwritters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${film.releaseFullFormat}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${film.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${film.genre.length === 1 ? 'Genre' : 'Genres'}</td>
              <td class="film-details__cell">
                ${createGenresList(film.genre)}
            </tr>
          </table>
          <p class="film-details__film-description">

          ${film.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${film.isWatchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">${film.isWatchlist ? 'Already in watchlist' : 'Add to watchlist'}</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${film.isWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">${film.isWatched ? 'Already watched' : 'Add to watched'}</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${film.isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">${film.isFavorite ? 'Already in favorites' : 'Add to favorites'}</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
    </div>
  </form>
</section>
`;
