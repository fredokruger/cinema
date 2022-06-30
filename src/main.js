import { filmData } from './mock/film-info.js';
import {createCommentsData} from './mock/comments-info.js';
import {RenderPosition, renderElement} from './render.js';
import {createPopupOverlay} from './view/overlay-popup.js';
import {getScrollbarWidth} from './scrollbar-width.js';
import {createHeaderProfileTemplate} from './view/header-profile.js';
import {createMainNavigation} from './view/main-navigation.js';
import {createSortingListTemplate} from './view/sorting-list.js';
import {createFilmsContainerTemplate} from './view/films-container.js';
import {createFilmsList} from './view/films-list.js';
import {createShowMoreButton} from './view/show-more-button.js';
import {createExtraTopRated} from './view/extra-top-rated-list.js';
import {createExtraMostCommentedList} from './view/extra-most-commented-list.js';
import {createCardsContainer} from './view/cards-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmsCount}  from './view/films-count.js';
import {createFilmDetails} from './view/film-details.js';
import {createFilmComments} from './view/comments.js';

const body = document.body;
const header = document.querySelector('.header');
//Шапка хэдера с профилем
renderElement(header, createHeaderProfileTemplate(), RenderPosition.BEFOREEND);

const main = document.querySelector('.main');
//Основная навигация
renderElement(main, createMainNavigation(), RenderPosition.BEFOREEND);

//Сортировка фильмов
renderElement(main, createSortingListTemplate(), RenderPosition.BEFOREEND);

//Общий контейнер фильмов
const filmsContainerComponent = createFilmsContainerTemplate();
renderElement(main, filmsContainerComponent, RenderPosition.BEFOREEND);
const filmsContainer = document.querySelector('.films');
//Секция с фильмами по 5 штук
const filmsListContainerComponent = createFilmsList();
renderElement(filmsContainer, filmsListContainerComponent, RenderPosition.BEFOREEND);
const filmsListContainer = document.querySelector('.films-list');
//Секция с топрэйтед фильмами
const topRatedFilmsListContainerComponent = createExtraTopRated();
renderElement(filmsContainer, topRatedFilmsListContainerComponent, RenderPosition.BEFOREEND);
//Секция с мосткомментед фильмами
const mostCommentedFilmsListContainerComponent = createExtraMostCommentedList();
renderElement(filmsContainer, mostCommentedFilmsListContainerComponent, RenderPosition.BEFOREEND);

//Контейнер с карточками фильмов по 5
const cardsContainerComponent = createCardsContainer();
renderElement(filmsListContainer, cardsContainerComponent, RenderPosition.BEFOREEND);
const cardsContainer = document.querySelector('.films-list__container');

// Контейнер с топрэйтед карточками
// const topRatedCardsContainerComponent = new CardsListContainerView();
// renderElement(topRatedFilmsListContainerComponent.element, topRatedCardsContainerComponent.element, RenderPosition.BEFOREEND);
// //Контейнер с мосткомментед карточками
// const mostCommentedCardsContainerComponent = new CardsListContainerView();
// renderElement(mostCommentedFilmsListContainerComponent.element, mostCommentedCardsContainerComponent.element, RenderPosition.BEFOREEND);

//Кнопка показать больше
const showMoreButtonComponent = createShowMoreButton();
renderElement(filmsListContainer, showMoreButtonComponent, RenderPosition.BEFOREEND);
const showMoreButton = document.querySelector('.films-list__show-more');

//5 карточек фильмов
const ITEMS_COUNT = 5;
const sliceFilms = filmData.slice(0, ITEMS_COUNT);
sliceFilms.forEach((item) => renderElement(cardsContainer, createFilmCardTemplate(item), RenderPosition.BEFOREEND));

//функция отрисовки следующих пяти фильмов
const createLoaderFunction = (array) => {
  let currentFilmsCount = ITEMS_COUNT;
  const onLoaderFilmsClick = () => {
    const nextSliceFilms = array.slice(currentFilmsCount, currentFilmsCount + ITEMS_COUNT);
    nextSliceFilms.forEach((item) => renderElement(cardsContainer, createFilmCardTemplate(item), RenderPosition.BEFOREEND));
    currentFilmsCount += ITEMS_COUNT;
    if (currentFilmsCount >= array.length) {
      showMoreButton.remove();
    }
  };
  showMoreButton.addEventListener('click', onLoaderFilmsClick);
};

createLoaderFunction(filmData);

//Статистика в футере
const filmsCountContainer = document.querySelector('.footer__statistics');
renderElement(filmsCountContainer, createFilmsCount(), RenderPosition.BEFOREEND);


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
    //установить через сеттер текущий фильм
    renderElement(body, createFilmDetails(filmData[currentFilmId]), RenderPosition.BEFOREEND);
    renderElement(body, createPopupOverlay(), RenderPosition.BEFOREEND);
    filmDetails = document.querySelector('.film-details');
    const filmCommentsContainer = document.querySelector('.film-details__bottom-container');
    renderElement(filmCommentsContainer, createFilmComments(createCommentsData()), RenderPosition.BEFOREEND);
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
