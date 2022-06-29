const MAX_LENGTH_DESCRIPTION_STRING_TO_FILM_CARD = 140;
//Функция получения рандомного числа из дипазона
const chooseRandomNumber = (min, max, fixed) => {
  if (fixed) {
    const randomFractionalNumber = (Math.random() * (max + 1 - min) + min).toFixed(1);
    return randomFractionalNumber >= max ? max.toFixed(1) : randomFractionalNumber;
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getConvertedString = (string, specifiedLength) => string.length > specifiedLength ? `${string.slice(0, specifiedLength - 1)}...` : string;
export {chooseRandomNumber, getConvertedString, MAX_LENGTH_DESCRIPTION_STRING_TO_FILM_CARD};
