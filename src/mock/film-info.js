import {chooseRandomNumber} from '../util.js';
import {createCommentsData} from './comments-info.js';

const MIN_LENGTH_DATA_FILMS = 15;
const MAX_LENGTH_DATA_FILMS = 20;

const MIN_LENGTH_STRING_DESCRIPTION = 1;
const MAX_LENGTH_STRING_DESCRIPTION = 4;

const MIN_LENGTH_STRING_SCREENWRITER = 1;
const MAX_LENGTH_STRING_SCREENWRITER = 4;

const MIN_LENGTH_STRING_ACTORS = 4;
const MAX_LENGTH_STRING_ACTORS = 16;

const MIN_LENGTH_STRING_GENRES = 1;
const MAX_LENGTH_STRING_GENRES = 3;

const nameFilms = [
  'Made for each other',
  'Popeye meets sindbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The Great Flamarion',
  'The man with the golden arm'
];

const pathForPicture = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const genre = [
  'Melodrama',
  'Cartoon',
  'Comedy',
  'Drama',
  'Fantastic',
  'Musical',
  'Thriller'
];

const duration = [
  '1h 40m',
  '1h 16m',
  '54m',
  '1h 21m',
  '1h 55m',
  '1h 18m',
  '1h 59m'
];

const originalNameFilms = [
  'Made for each other',
  'Popeye meets sindbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The Great Flamarion',
  'The man with the golden arm'
];

const director = [
  'Александр Овечкин',
  'Дмитрий Толстой',
  'Пётр Первый',
  'Григорий Оборванцев',
  'Сергей Кутерьма',
];

const screenwritters = [
  'Шакро Молодой',
  'Рембо Кровский',
  'Арни Старый',
  'Бенжамин Баттон',
  'Алексей Сплит',
];

const actors = [
  'Василий Пилюлин',
  'Виктор Пелевин',
  'Стас Метёлкин',
  'Аристарх Позолотов',
  'Александр Люсин',
];

const ageRating = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+'
];

const country = [
  'USSR',
  'USA',
  'Italia',
  'The Great Britain',
  'India'
];

const releaseDates = [
  '2017-05-07T00:00:00.000Z',
  '2018-08-12T00:00:00.000Z',
  '2019-10-11T00:00:00.000Z',
  '2020-12-30T00:00:00.000Z',
  '2021-03-03T00:00:00.000Z'
];

const descriptionsList = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
  .split(/\.\s/);

const getRandomDescriptionsList = () => Array.from ({length: chooseRandomNumber(MIN_LENGTH_STRING_DESCRIPTION, MAX_LENGTH_STRING_DESCRIPTION)}, () => descriptionsList[chooseRandomNumber(0, descriptionsList.length - 1)]).join('. ');

const getRandomScreenWrittersList = () => Array.from({length: chooseRandomNumber(MIN_LENGTH_STRING_SCREENWRITER, MAX_LENGTH_STRING_SCREENWRITER)}, () => screenwritters[chooseRandomNumber(0, screenwritters.length - 1)]).join(', ');

const getRandomActorsList = () => Array.from({length: chooseRandomNumber(MIN_LENGTH_STRING_ACTORS, MAX_LENGTH_STRING_ACTORS)}, () => actors[chooseRandomNumber(0, actors.length - 1)]).join(', ');

const getRandomGenresList = () => Array.from({length: chooseRandomNumber(MIN_LENGTH_STRING_GENRES, MAX_LENGTH_STRING_GENRES)}, () => genre[chooseRandomNumber(0, genre.length - 1)]);

const getRandomReleaseDate = (dates, isFull) => {
  const date = dates[chooseRandomNumber(0, dates.length - 1)];
  const formattedDate = new Date(date);
  if (isFull) {
    return `${formattedDate.getDate()} ${formattedDate.toLocaleString('en-EN', { month: 'long' })} ${formattedDate.getFullYear()}`;
  }
  return `${formattedDate.getFullYear()}`;
};

const createFilmsData = () => Array.from({length: chooseRandomNumber(MIN_LENGTH_DATA_FILMS, MAX_LENGTH_DATA_FILMS)}, (_, index) => ( {
  id: index,
  img: `./images/posters/${pathForPicture[chooseRandomNumber(0, pathForPicture.length - 1)]}`,
  name: nameFilms[chooseRandomNumber(0, nameFilms.length - 1)],
  originalName: originalNameFilms[chooseRandomNumber(0, originalNameFilms.length - 1)],
  rating: chooseRandomNumber(0, 10, true),
  director: director[chooseRandomNumber(0, director.length - 1)],
  screenwritters: getRandomScreenWrittersList(),
  actors: getRandomActorsList(),
  releaseYear: getRandomReleaseDate(releaseDates, false),
  releaseFullFormat: getRandomReleaseDate(releaseDates, true),
  duration: duration[chooseRandomNumber(0, duration.length - 1)],
  country: country[chooseRandomNumber(0, country.length - 1)],
  genres: getRandomGenresList(),
  description: getRandomDescriptionsList(),
  ageRating: ageRating[chooseRandomNumber(0, ageRating.length - 1)],
  comments: createCommentsData(),
  isWatchlist: Boolean(chooseRandomNumber(0,1)),
  isWatched: Boolean(chooseRandomNumber(0,1)),
  isFavorite: Boolean(chooseRandomNumber(0,1)),
}
));
const filmData = createFilmsData();

export {filmData};
