import SortView from './sortView';

class HeapSortView extends SortView {
  _getHeapSortAnimations(array) {
    if (array.length <= 1) return array;
    const animations = [];

    let array_length;
    /* to create MAX  array */
    function heap_root(array, i) {
      var left = 2 * i + 1;
      var right = 2 * i + 2;
      var max = i;

      if (left < array_length && array[left] > array[max]) {
        max = left;
      }

      if (right < array_length && array[right] > array[max]) {
        max = right;
      }

      if (max !== i) {
        swap(array, i, max);
        heap_root(array, max);
      }
    }

    function swap(array, i, j) {
      var temp = array[i];

      animations.push([i, j, 'swap-highlight']);
      animations.push([i, j, 'swap-swap']);
      animations.push([i, j, 'restore']);

      array[i] = array[j];
      array[j] = temp;
    }

    function heapSort(array) {
      array_length = array.length;

      for (let i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heap_root(array, i);
      }

      for (let i = array.length - 1; i > 0; i--) {
        swap(array, 0, i);
        array_length--;

        heap_root(array, 0);
      }
      return array;
    }

    heapSort(array);
    animations.push(['doneall']);
    return animations;
  }

  addEventHeapSort(getArrayCallback) {
    this._heapSortButton.addEventListener('click', () => {
      const array = getArrayCallback();
      this._animate(array, this._getHeapSortAnimations.bind(this));
    });
  }
}

export default new HeapSortView();
