import SortView from './sortView';

class ControlSortView extends SortView {
  addEventStopSorting(
    checkModalOpenedCallback,
    setSortingStoppedCallbackTrue,
    setModalOpenedFalseCallback
  ) {
    window.addEventListener('keydown', e => {
      if (e.code === 'Space') e.preventDefault();
      if (e.key === 'Escape' || e.code === 'Escape') {
        if (checkModalOpenedCallback() === true) {
          this._modal.classList.remove('u-display-flex');
          setModalOpenedFalseCallback();
        } else {
          const highestTimeoutId = setTimeout(';');
          for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
          }
          this._enableSliders();
          setSortingStoppedCallbackTrue();
        }
      }
    });
  }

  addEventEnableButtons(
    checkSortingStoppedCallback,
    setSortingStoppedCallbackFalse
  ) {
    this._rangeArraySize.addEventListener('input', () => {
      if (checkSortingStoppedCallback() === false) return;
      this._enableButtons();
      setSortingStoppedCallbackFalse();
    });
  }
}

export default new ControlSortView();
