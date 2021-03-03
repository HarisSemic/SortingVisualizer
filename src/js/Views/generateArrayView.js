import SortView from './sortView';

class GenerateArrayView extends SortView {
  addEventArraySizeChange(callback) {
    this._rangeArraySize.addEventListener('input', e => {
      this._clear();
      const size = Number(e.target.value);
      callback(size);
    });
    window.addEventListener('load', () => {
      callback(80);
    });
  }

  // init() {
  //   this._addEventArraySizeChange();
  // }
}

export default new GenerateArrayView();
