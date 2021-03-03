import { generateRandomFloatNumber } from './helpers';

export const state = {
  array: [],
  modalOpened: false,
  sortingStopped: false,
};

export const generateArray = function (length) {
  state.array.length = 0;
  for (let i = 0; i < length; i++) {
    state.array.push(Number(generateRandomFloatNumber(1.0, 100.0)));
  }
};

export const setModalTrue = function () {
  state.modalOpened = true;
};

export const setModalFalse = function () {
  state.modalOpened = false;
};

export const checkModalOpened = function () {
  return state.modalOpened;
};

export const setSortingStoppedTrue = function () {
  state.sortingStopped = true;
};

export const setSortingStoppedFalse = function () {
  state.sortingStopped = false;
};

export const checkSortingStopped = function () {
  return state.sortingStopped;
};
