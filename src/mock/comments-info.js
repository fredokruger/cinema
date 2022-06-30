import {chooseRandomNumber} from '../util.js';

const MIN_LENGTH_COMMENTS_LIST = 0;
const MAX_LENGTH_COMMENTS_LIST = 5;

const comments = [
  'Interesting setting and a good cast',
  'Gooood',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const authors = [
  'Tim Macoveev',
  'John Doe',
  'Jone jones',
  'Max Payne',
  'Jimmy Burt',
];

const pathForEmoji = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const releaseComments = [
  '2 days ago',
  '3 days ago',
  '2019/12/31 23:59',
  'Today',
  '4 days ago'
];

const createCommentsData = () => Array.from({length: chooseRandomNumber(MIN_LENGTH_COMMENTS_LIST, MAX_LENGTH_COMMENTS_LIST)}, (_, index) => ( {
  id: index,
  img: `./images/emoji/${pathForEmoji[chooseRandomNumber(0, pathForEmoji.length - 1)]}.png`,
  author: authors[chooseRandomNumber(0, authors.length - 1)],
  message: comments[chooseRandomNumber(0, comments.length - 1)],
  releaseDate: releaseComments[chooseRandomNumber(0, releaseComments.length - 1)]
}
));

export {createCommentsData};
