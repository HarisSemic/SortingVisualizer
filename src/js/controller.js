import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';

import generateArrayView from './Views/generateArrayView';
import bubbleSortView from './Views/bubbleSortView';
import insertionSortView from './Views/insertionSortView';
import selectionSortView from './Views/selectionSortView';
import mergeSortView from './Views/mergeSortView';
import quickSortView from './Views/quickSortView';
import heapSortView from './Views/heapSortView';

import modalHelpView from './Views/modalHelpView';
import controlSortView from './Views/controlSortView';

const controlGenerateArray = function (size) {
  model.generateArray(size);
  generateArrayView.generateArrayHtml(model.state.array);
};

const controlGetArray = function () {
  return model.state.array;
};

// const controlStopSorting = function () {
//   model.setSortingStoppedTrue();
// };

// const controlCheckStopSorting = function () {
//   return model.checkSortingStopped();
// };

// const controlEnableSorting = function () {
//   model.setSortingStoppedFalse();
// };

// const controlCheckModal = function () {
//   return model.checkModalOpened();
// };

const init = function () {
  generateArrayView.addEventArraySizeChange(controlGenerateArray);
  bubbleSortView.addEventBubbleSort(controlGetArray);
  insertionSortView.addEventInsertionSort(controlGetArray);
  selectionSortView.addEventSelectionSort(controlGetArray);
  mergeSortView.addEventMergeSort(controlGetArray);
  quickSortView.addEventQuickSort(controlGetArray);
  heapSortView.addEventHeapSort(controlGetArray);
  modalHelpView.addEventShowModal(model.setModalTrue);
  modalHelpView.addEventHideModal(model.setModalFalse, model.checkModalOpened);
  controlSortView.addEventStopSorting(
    model.checkModalOpened,
    model.setSortingStoppedTrue,
    model.setModalFalse
  );
  controlSortView.addEventEnableButtons(
    model.checkSortingStopped,
    model.setSortingStoppedFalse
  );
};

init();
