export default class View {
  _modal = document.querySelector('.modal');
  _btnShowModal = document.querySelector('.btn-help');
  _btnCloseModal = this._modal.querySelector('.modal__close');

  _swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
