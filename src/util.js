//Функция получения рандомного числа из дипазона
const chooseRandomNumber = (min, max, fixed) => {
  if (fixed) {
    const randomFractionalNumber = (Math.random() * (max + 1 - min) + min).toFixed(1);
    return randomFractionalNumber >= max ? max.toFixed(1) : randomFractionalNumber;
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export {chooseRandomNumber};
