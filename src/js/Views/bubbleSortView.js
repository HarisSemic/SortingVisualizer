import SortView from './sortView';

class BubbleSortView extends SortView {
  _getBubbleSortAnimations(arr) {
    const animations = [];
    let j = 0;
    for (let i = arr.length - 1; i > -1; i--) {
      for (j = 0; j < i; j++) {
        animations.push([j, 'select']);
        if (arr[j] > arr[j + 1]) {
          animations.push([j, j + 1, 'swap-highlight']);
          this._swap(arr, j, j + 1);
          animations.push([j, j + 1, 'swap-swap']);
          animations.push([j, j + 1, 'restore']);
        } else animations.push([j, 'restore']);
      }
      animations.push([j, 'done']);
    }
    return animations;
  }

  addEventBubbleSort(getArrayCallback) {
    this._bubbleSortButton.addEventListener('click', () => {
      const array = getArrayCallback();
      this._animate(array, this._getBubbleSortAnimations.bind(this));
    });
  }
}

export default new BubbleSortView();
