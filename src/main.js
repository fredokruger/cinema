import {filmData} from './mock/film-info.js';

import {RenderPosition, render} from './render.js';
import HeaderProfileView from './view/header-profile.js';
import MainNavigationView from './view/main-navigation.js';
import SortingListView from './view/sorting-list.js';
import FilmsContainerView from './view/films-container.js';
import AllFilmsView from './view/films-list.js';
import EmptyListView from './view/empty-films-list.js';
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

//Основная навигация
const mainNavigation = new MainNavigationView().element;
//Общий контейнер фильмов
const filmsContainer = new FilmsContainerView().element;
//Секция с фильмами по 5 штук
const allFilmsList = new AllFilmsView().element;
//Контейнер с фильмами по 5 штук
const allFilmsContainer = allFilmsList.querySelector('.films-list__container');
//Кнопка показать больше
const showMoreButton = new ShowMoreButtonView().element;
//Статистика в футере
const filmsCountContainer = document.querySelector('.footer__statistics');

//Функция отрисовки фильмов
let currentFilmsCount;
const createLoaderFilms = () => {
  //Отрисовка первых 5 карточек фильмов
  const sliceFilms = filmData.slice(0, FILMS_COUNT);
  sliceFilms.forEach((item) => render(allFilmsContainer, new FilmCardView(item).element, RenderPosition.BEFOREEND));
  //Счетчик количества отрисованных фильмов
  currentFilmsCount = FILMS_COUNT;
};

//Отрисовка следующих 5 фильмов
const onLoaderFilmsClick = () => {
  const nextSliceFilms = filmData.slice(currentFilmsCount, currentFilmsCount + FILMS_COUNT);
  nextSliceFilms.forEach((item) => render(allFilmsContainer, new FilmCardView(item).element, RenderPosition.BEFOREEND));
  currentFilmsCount += FILMS_COUNT;
  if (currentFilmsCount >= filmData.length && showMoreButton) {
    showMoreButton.remove();
  }
};

let filmDetails;
let overlay;
//Функция закрытия попапа с подробным описанием фильма
const closeFilmPopup = () => {
  body.classList.remove('hide-overflow');
  body.style.marginRight = '';
  filmDetails.remove();
  overlay.remove();
};

//Функция закрытия попапа с подробным описанием фильма на клавишу
const onPopupKeydown = (evt) => {
  if (evt.key !== 'Escape') {
    return;
  }
  evt.preventDefault();
  closeFilmPopup();
  document.removeEventListener('keydown', onPopupKeydown);
};

//Функция открытия попапа с подробным описанием фильма
const openFilmPopup = (evt) => {
  if (evt.target.closest('.film-card') && !evt.target.matches('.film-card__controls-item')) {
    const currentFilmId = evt.target.closest('.film-card').getAttribute('id');
    render(body, new FilmDetailsView(filmData[currentFilmId]).element, RenderPosition.BEFOREEND);
    render(body, new PopupOverlayView().element, RenderPosition.BEFOREEND);
    filmDetails = document.querySelector('.film-details');
    const filmCommentsContainer = document.querySelector('.film-details__bottom-container');
    render(filmCommentsContainer, new FilmCommentsView(filmData[currentFilmId].comments).element, RenderPosition.BEFOREEND);
    overlay = document.querySelector('.overlay');
    body.classList.add('hide-overflow');
    body.style.marginRight = `${getScrollbarWidth()}px`;
    const currentCloseButton = filmDetails.querySelector('.film-details__close-btn');
    currentCloseButton.addEventListener('click', closeFilmPopup);
    overlay.addEventListener('click', closeFilmPopup);
    document.addEventListener('keydown', onPopupKeydown);
  }
};

//Функция отрисовки компонентов в зависимости от количества фильмов
const createFilmsContainers = () => {
  //Отрисовка основной навигации
  render(main, mainNavigation, RenderPosition.BEFOREEND);
  //Отрисовка общего контейнера фильмов
  render(main, filmsContainer, RenderPosition.BEFOREEND);
  //Отрисовка статистики в футере
  render(filmsCountContainer, new FilmsCountView(filmData).element, RenderPosition.BEFOREEND);

  if (filmData.length === 0 ) {
    render(filmsContainer, new EmptyListView().element, RenderPosition.BEFOREEND);
  }

  if (filmData.length > 0 ) {
    //Отрисовка шапки хедера с профилем
    render(header, new  HeaderProfileView().element, RenderPosition.BEFOREEND);
    //Отрисовка сортировки фильмов
    render(mainNavigation, new SortingListView().element, RenderPosition.AFTEREND);
    //Отрисовка секции фильмов по 5 штук
    render(filmsContainer, allFilmsList, RenderPosition.BEFOREEND);
    //Отрисовка карточек фильмов в основной секции
    createLoaderFilms();
    //Открытие полной информации о фильме
    filmsContainer.addEventListener('click', openFilmPopup);

    //Секция с топрэйтед фильмами
    const topRatedFilmsContainer = new TopRatedView().element;
    render(filmsContainer, topRatedFilmsContainer, RenderPosition.BEFOREEND);

    //Секция с мосткомментед фильмами
    const mostCommentedFilmsContainer = new MostCommentedView().element;
    render(filmsContainer, mostCommentedFilmsContainer, RenderPosition.BEFOREEND);
  }

  if (filmData.length > FILMS_COUNT) {
    //Отрисовка кнопки показать больше
    render(allFilmsList, showMoreButton, RenderPosition.BEFOREEND);
    //Загрузка следующих фильмов по нажатию
    showMoreButton.addEventListener('click', onLoaderFilmsClick);
  }
};

createFilmsContainers(filmData);

// //Работа с фильтрами
// const filterButtons = mainNavigation.querySelectorAll('.main-navigation__item');

// const onFilterButtonClick = (evt) => {
//   evt.preventDefault();
//   if (evt.target.closest('.main-navigation__item')) {
//     filterButtons.forEach((item) => item.classList.remove('main-navigation__item--active'));
//     // allFilmsContainer.innerHTML = '';
//   }
//   if (evt.target.closest('[href="#all"]')) {
//     evt.target.classList.add('main-navigation__item--active');
//     createLoaderFilms(filmData);
//   }
//   if (evt.target.closest('[href="#watchlist"]')) {
//     evt.target.classList.add('main-navigation__item--active');
//     const watchlistFilms = filmData.slice().filter((item) => item.isWatchlist === true);
//     const sliceWatchlistFilms = watchlistFilms.slice(0, FILMS_COUNT);
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

// mainNavigation.addEventListener('click', onFilterButtonClick);
