export const generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomFloatNumber = function (min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
};
