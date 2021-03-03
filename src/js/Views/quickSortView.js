import SortView from './sortView';

class QuickSortView extends SortView {
  _getQuickSortAnimations(array) {
    if (array.length <= 1) return array;
    const animations = [];

    const partition = function (array, left, right) {
      let middle = Math.floor((right + left) / 2),
        pivot = array[middle],
        i = left, // Start pointer at the first item in the array
        j = right; // Start pointer at the last item in the array

      animations.push([middle, 'observe']);
      animations.push([i, 'select']);
      animations.push([i, 'restore']);
      animations.push([j, 'select']);
      animations.push([j, 'restore']);
      while (i <= j) {
        // Move left pointer to the right until the value at the
        // left is greater than the pivot value
        while (array[i] < pivot) {
          i++;
          animations.push([i, 'select']);
          animations.push([i, 'restore']);
        }

        // Move right pointer to the left until the value at the
        // right is less than the pivot value
        while (array[j] > pivot) {
          j--;
          animations.push([j, 'select']);
          animations.push([j, 'restore']);
        }

        // If the left pointer is less than or equal to the
        // right pointer, then swap values
        if (i <= j) {
          animations.push([i, j, 'swap-highlight']);
          animations.push([i, j, 'swap-swap']);
          animations.push([i, j, 'restore']);
          [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
          i++;
          j--;
        }
      }

      return i;
    };

    const quickSort = function (array, left, right) {
      let length = array.length,
        index;

      if (length > 1) {
        index = partition(array, left, right, animations);

        if (left < index - 1) {
          quickSort(array, left, index - 1, animations);
        }

        if (index < right) {
          quickSort(array, index, right, animations);
        }
      }

      return array;
    };

    quickSort(array, 0, array.length - 1);

    animations.push(['doneall']);
    return animations;
  }

  addEventQuickSort(getArrayCallback) {
    this._quickSortButton.addEventListener('click', () => {
      const array = getArrayCallback();
      this._animate(array, this._getQuickSortAnimations.bind(this));
    });
  }
}

export default new QuickSortView();
