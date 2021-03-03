import SortView from './sortView';

class SelectionSortView extends SortView {
  _getSelectionSortAnimations(arr) {
    const animations = [];
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      animations.push([i, 'observe']);
      for (let j = i + 1; j < arr.length; j++) {
        animations.push([j, 'select']);
        if (arr[j] < arr[min]) {
          if (min !== i) animations.push([min, j, 'restore-select']);
          min = j;
        } else {
          animations.push([j, 'restore']);
        }
      }
      if (i !== min) {
        animations.push([i, min, 'swap-highlight']);
        this._swap(arr, i, min);
        animations.push([i, min, 'swap-swap']);
        animations.push([i, min, 'restore']);
      } else {
        animations.push([min, 'restore']);
      }
    }
    animations.push(['doneall']);
    return animations;
  }

  selectionSort([...arr]) {
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) min = j;
      }
      if (i !== min) this._swap(arr, i, min);
    }
    return arr;
  }

  addEventSelectionSort(getArrayCallback) {
    this._selectionSortButton.addEventListener('click', () => {
      const array = getArrayCallback();
      this._animate(array, this._getSelectionSortAnimations.bind(this));
      //   this._testSort(this.selectionSort.bind(this));
    });
  }
}

export default new SelectionSortView();
