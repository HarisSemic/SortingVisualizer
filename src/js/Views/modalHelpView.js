import View from './View';

class ModalHelpView extends View {
  addEventShowModal(callback) {
    this._btnShowModal.addEventListener('click', () => {
      this._modal.classList.add('u-display-flex');
      callback();
    });
  }

  addEventHideModal(setModalOpenedFalseCallback, checkModalOpenedCallback) {
    this._btnCloseModal.addEventListener('click', () => {
      if (!checkModalOpenedCallback()) return;
      this._modal.classList.remove('u-display-flex');
      if (!this._modal.classList.contains('u-display-flex'))
        setModalOpenedFalseCallback();
    });
    this._modal.addEventListener('click', e => {
      if (!checkModalOpenedCallback()) return;
      if (e.target.closest('.modal__content')) return;
      this._modal.classList.remove('u-display-flex');
      if (!this._modal.classList.contains('u-display-flex'))
        setModalOpenedFalseCallback();
    });
    // window.addEventListener('keydown', e => {
    //   if (e.key === 'Escape' || e.code === 'Escape') {
    //     if (!checkModalOpenedCallback()) return;
    //     this._modal.classList.remove('u-display-flex');
    //     if (!this._modal.classList.contains('u-display-flex'))
    //       setModalOpenedFalseCallback();
    //   }
    // });
  }
}

export default new ModalHelpView();
