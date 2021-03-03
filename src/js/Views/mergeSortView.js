import SortView from './sortView';

class MergeSortView extends SortView {
  _getMergeSortAnimations(array) {
    if (array.length <= 1) return array;
    const animations = [];
    const auxiliaryArray = array.slice();

    const mergeSortHelper = function (
      mainArray,
      auxiliaryArray,
      startIndex,
      endIndex,
      level = 0
    ) {
      if (startIndex === endIndex) return;
      const midIndex = Math.floor((startIndex + endIndex) / 2);
      mergeSortHelper(
        auxiliaryArray,
        mainArray,
        startIndex,
        midIndex,
        level + 1
      );
      mergeSortHelper(
        auxiliaryArray,
        mainArray,
        midIndex + 1,
        endIndex,
        level + 1
      );
      doMerge(mainArray, auxiliaryArray, startIndex, midIndex, endIndex, level);
    };

    //This function is tasked with merge phase of merge sort and filling the animations array. We iterate through both
    //halves of the current subarray in auxiliary array, and replace values in order, by value ascending (other orderings
    //can be defined) in the main array. We also push pair of indexes on which values are being compared, to change colors
    //of respective bars in the DOM.
    const doMerge = function (
      mainArray,
      auxiliaryArray,
      startIndex,
      midIndex,
      endIndex,
      level
    ) {
      let k = startIndex;
      let i = startIndex;
      let j = midIndex + 1;
      while (i <= midIndex && j <= endIndex) {
        //push once to change bar colors
        animations.push([i, j, 'select']);
        //push twice to change colors back
        animations.push([i, j, 'restore']);
        //compare values from two halves and push pair of indexes to animations array,
        //that indicates replacement
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
          animations.push([k, auxiliaryArray[i], 'updateheight']);
          mainArray[k++] = auxiliaryArray[i++];
        } else {
          animations.push([k, auxiliaryArray[j], 'updateheight']);
          mainArray[k++] = auxiliaryArray[j++];
        }
      }
      //next two while loops handle cases where one or both halves haven't been exhausted.
      while (i <= midIndex) {
        animations.push([i, i, 'select']);
        animations.push([i, i, 'restore']);
        animations.push([k, auxiliaryArray[i], 'updateheight']);
        mainArray[k++] = auxiliaryArray[i++];
      }
      while (j <= endIndex) {
        animations.push([j, j, 'select']);
        animations.push([j, j, 'restore']);
        animations.push([k, auxiliaryArray[j], 'updateheight']);
        mainArray[k++] = auxiliaryArray[j++];
      }
    };
    mergeSortHelper(array, auxiliaryArray, 0, array.length - 1);
    animations.push(['doneall']);
    return animations;
  }

  addEventMergeSort(getArrayCallback) {
    this._mergeSortButton.addEventListener('click', () => {
      const array = getArrayCallback();
      this._animate(array, this._getMergeSortAnimations.bind(this));
      //   this._testSort(this.selectionSort.bind(this));
    });
  }
}

export default new MergeSortView();
