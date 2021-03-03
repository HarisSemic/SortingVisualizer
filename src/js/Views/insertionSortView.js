import SortView from './sortView';
import { generateRandomNumber } from '../helpers';

class InsertionSortView extends SortView {
  _getInsertionSortAnimations(arr) {
    const animations = [];
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      let currValue = arr[i];
      animations.push([i, 'observe']);
      //   animations.push([i, 'restore']);
      while (j >= 0 && arr[j] > currValue) {
        animations.push([j, j + 1, 'swap-highlight']);
        this._swap(arr, j, j + 1);
        animations.push([j, j + 1, 'swap-swap']);
        animations.push([j, j + 1, 'observe-restore']);

        // console.log(
        //   `${j}: ${this._getBarHeight(j)}`,
        //   `${j + 1}: ${this._getBarHeight(j + 1)}`
        // );
        if (j > 0) j--;
      }
      animations.push([j, j + 1, 'restore']);
    }
    animations.push(['doneall']);
    return animations;
  }

  // _getInsertionSortAnimations(arr) {
  //   const animations = [];
  //   for (let i = 1; i < arr.length; i++) {
  //     let j = i - 1;
  //     let currValue = arr[i];
  //     let currHeight = this._getBarHeight(i);
  //     animations.push([i, 'observe']);
  //     //   animations.push([i, 'restore']);
  //     let change = false;
  //     while (j >= 0 && arr[j] > currValue) {
  //       animations.push([j, 'select']);
  //       arr[j + 1] = arr[j];
  //       animations.push([j, 'moved']);
  //       animations.push([j + 1, 'moved']);
  //       animations.push([j + 1, j, 'updateheight']);
  //       // console.log(
  //       //   `${j}: ${this._getBarHeight(j)}`,
  //       //   `${j + 1}: ${this._getBarHeight(j + 1)}`
  //       // );
  //       animations.push([j, j + 1, 'restore']);
  //       j--;
  //     }
  //     arr[j + 1] = currValue;
  //     animations.push([j + 1, currHeight, 'newheight']);
  //     animations.push([i, 'restore']);
  //   }
  //   return animations;
  // }

  _insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let currValue = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > currValue) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = currValue;
    }
    return arr;
  }

  addEventInsertionSort(getArrayCallback) {
    this._insertionSortButton.addEventListener('click', () => {
      const array = getArrayCallback();
      this._animate(array, this._getInsertionSortAnimations.bind(this));
    });
  }
}

export default new InsertionSortView();
