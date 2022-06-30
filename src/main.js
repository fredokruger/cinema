import {filmData} from './mock/film-info.js';
import {createCommentsData} from './mock/comments-info.js';

import {RenderPosition, render} from './render.js';
import HeaderProfileView from './view/header-profile.js';
import MainNavigationView from './view/main-navigation.js';
import SortingListView from './view/sorting-list.js';
import FilmsContainerView from './view/films-container.js';
import AllFilmsView from './view/films-list.js';
import TopRatedView from './view/extra-top-rated-list.js';
import MostCommentedView from './view/extra-most-commented-list.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmCardView from './view/film-card.js';
import FilmsCountView  from './view/films-count.js';
import FilmDetailsView from './view/film-details.js';
import PopupOverlayView from './view/overlay-popup.js';
import FilmCommentsView from './view/film-comments.js';
import {getScrollbarWidth} from './scrollbar-width.js';

const FILMS_COUNT = 5;

const body = document.body;
const header = document.querySelector('.header');
const main = document.querySelector('.main');

//Шапка хэдера с профилем
render(header, new  HeaderProfileView().element, RenderPosition.BEFOREEND);

//Основная навигация
render(main, new MainNavigationView().element, RenderPosition.BEFOREEND);

//Сортировка фильмов
render(main, new SortingListView().element, RenderPosition.BEFOREEND);

//Общий контейнер фильмов
const filmsContainer = new FilmsContainerView().element;
render(main, filmsContainer, RenderPosition.BEFOREEND);

//Секция с фильмами по 5 штук
const allFilmsList = new AllFilmsView().element;
render(filmsContainer, allFilmsList, RenderPosition.BEFOREEND);

//Секция с топрэйтед фильмами
const topRatedFilmsContainer = new TopRatedView().element;
render(filmsContainer, topRatedFilmsContainer, RenderPosition.BEFOREEND);

//Секция с мосткомментед фильмами
const mostCommentedFilmsContainer = new MostCommentedView().element;
render(filmsContainer, mostCommentedFilmsContainer, RenderPosition.BEFOREEND);

//Кнопка показать больше
const showMoreButton = new ShowMoreButtonView().element;
render(allFilmsList, showMoreButton, RenderPosition.BEFOREEND);

//функция отрисовки фильмов
const createLoaderFilms = (array) => {
  //Отрисовка первых 5 карточек фильмов
  const allFilmsContainer = allFilmsList.querySelector('.films-list__container');
  const sliceFilms = filmData.slice(0, FILMS_COUNT);
  sliceFilms.forEach((item) => render(allFilmsContainer, new FilmCardView(item).element, RenderPosition.BEFOREEND));
  //Счетчик количества отрисованных фильмов
  let currentFilmsCount = FILMS_COUNT;
  //Отрисовка следующих 5 фильмов
  const onLoaderFilmsClick = () => {
    const nextSliceFilms = array.slice(currentFilmsCount, currentFilmsCount + FILMS_COUNT);
    nextSliceFilms.forEach((item) => render(allFilmsContainer, new FilmCardView(item).element, RenderPosition.BEFOREEND));
    currentFilmsCount += FILMS_COUNT;
    if (currentFilmsCount >= array.length) {
      showMoreButton.remove();
    }
  };
  showMoreButton.addEventListener('click', onLoaderFilmsClick);
};

createLoaderFilms(filmData);

//Статистика в футере
const filmsCountContainer = document.querySelector('.footer__statistics');
render(filmsCountContainer, new FilmsCountView().element, RenderPosition.BEFOREEND);


let filmDetails;
let overlay;
//Функция закрытия попапа с подробным описанием фильма
const closeFilmPopup = () => {
  body.classList.remove('hide-overflow');
  body.style.marginRight = '';
  filmDetails.remove();
  overlay.remove();
  document.removeEventListener('keydown', onPopupKeydown);
};

//Функция закрытия попапа с подробным описанием фильма на клавишу
function onPopupKeydown (evt) {
  if (evt.key !== 'Escape') {
    return;
  }
  evt.preventDefault();
  closeFilmPopup();
}

//Функция открытия попапа с подробным описанием фильма
const openFilmPopup = (evt) => {
  if (evt.target.closest('.film-card') && !evt.target.matches('.film-card__controls-item')) {
    const currentFilmId = evt.target.closest('.film-card').getAttribute('id');
    render(body, new FilmDetailsView(filmData[currentFilmId]).element, RenderPosition.BEFOREEND);
    render(body, new PopupOverlayView().element, RenderPosition.BEFOREEND);
    filmDetails = document.querySelector('.film-details');
    const filmCommentsContainer = document.querySelector('.film-details__bottom-container');
    render(filmCommentsContainer, new FilmCommentsView(createCommentsData()).element, RenderPosition.BEFOREEND);
    overlay = document.querySelector('.overlay');
    body.classList.add('hide-overflow');
    body.style.marginRight = `${getScrollbarWidth()}px`;
    const currentCloseButton = filmDetails.querySelector('.film-details__close-btn');
    currentCloseButton.addEventListener('click', closeFilmPopup);
    overlay.addEventListener('click', closeFilmPopup);
    document.addEventListener('keydown', onPopupKeydown);
  }
};

filmsContainer.addEventListener('click', openFilmPopup);

// const filterButtons = mainNavigationComponent.element.querySelectorAll('.main-navigation__item');
// const allFilmsButton = mainNavigationComponent.element.querySelector('[href="#all"]');
// const watchlistButton = mainNavigationComponent.element.querySelector('[href="#watchlist"]');
// const historyButton = mainNavigationComponent.element.querySelector('[href="#history"]');
// const favoritesButton = mainNavigationComponent.element.querySelector('[href="#favorites"]');
// const onFilterButtonClick = (evt) => {
//   evt.preventDefault();
//   if (evt.target.closest('.main-navigation__item')) {
//     filterButtons.forEach((item) => item.classList.remove('main-navigation__item--active'));
//     cardsContainerComponent.element.innerHTML = '';
//     if (showMoreButton.element) {
//       showMoreButton.removeElement();
//     }
//     renderElement(filmsListContainerComponent.element, showMoreButton.element, RenderPosition.BEFOREEND);
//   }
//   if (evt.target.closest('[href="#all"]')) {
//     allFilmsButton.classList.add('main-navigation__item--active');
//     sliceFilms.forEach((item) => renderElement(cardsContainerComponent.element, new FilmCardView(item).element, RenderPosition.BEFOREEND));
//     createLoaderFunction(filmData);
//   }
//   if (evt.target.closest('[href="#watchlist"]')) {
//     watchlistButton.classList.add('main-navigation__item--active');
//     const watchlistFilms = filmData.slice().filter((item) => item.isWatchlist === true);
//     const sliceWatchlistFilms = watchlistFilms.slice(0, ITEMS_COUNT);
//     sliceWatchlistFilms.forEach((item) => renderElement(cardsContainerComponent.element, new FilmCardView(item).element, RenderPosition.BEFOREEND));
//     createLoaderFunction(watchlistFilms);
//   }
//   if (evt.target.closest('[href="#history"]')) {
//     historyButton.classList.add('main-navigation__item--active');
//     const watchedFilms = filmData.slice().filter((item) => item.isWatched === true);
//     const sliceWatchedFilms = watchedFilms.slice(0, ITEMS_COUNT);
//     sliceWatchedFilms.forEach((item) => renderElement(cardsContainerComponent.element, new FilmCardView(item).element, RenderPosition.BEFOREEND));
//     createLoaderFunction(watchedFilms);
//   }
//   if (evt.target.closest('[href="#favorites"]')) {
//     favoritesButton.classList.add('main-navigation__item--active');
//     const favoritesFilms = filmData.slice().filter((item) => item.isFavorite === true);
//     const sliceFavoritesFilms = favoritesFilms.slice(0, ITEMS_COUNT);
//     sliceFavoritesFilms.forEach((item) => renderElement(cardsContainerComponent.element, new FilmCardView(item).element, RenderPosition.BEFOREEND));
//     createLoaderFunction(favoritesFilms);
//   }
// };

// mainNavigationComponent.element.addEventListener('click', onFilterButtonClick);
