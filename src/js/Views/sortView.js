import View from './View';
import { generateRandomNumber } from '../helpers';

export default class SortView extends View {
  _parentElement = document.querySelector('.sorting-container');
  _rangeArraySize = document.querySelector('#array-length');
  _rangeSortingSpeed = document.querySelector('#sorting-speed');
  _bubbleSortButton = document.querySelector('#btn-bubble-sort');
  _selectionSortButton = document.querySelector('#btn-selection-sort');
  _insertionSortButton = document.querySelector('#btn-insertion-sort');
  _mergeSortButton = document.querySelector('#btn-merge-sort');
  _quickSortButton = document.querySelector('#btn-quick-sort');
  _heapSortButton = document.querySelector('#btn-heap-sort');
  _sliders = document.querySelectorAll('.slider');
  _barClasses = [
    'sorting-container__element--primary',
    'sorting-container__element--select',
    'sorting-container__element--swap',
    'sorting-container__element--done',
    'sorting-container__element--observed',
    'sorting-container__element--moved',
  ];

  _animate(arr, animationsCallback) {
    if (arr.length <= 1) return;
    const animations = animationsCallback(arr);
    let speed = 1005 - Number(this._rangeSortingSpeed.value);

    this._protectControls(animations, speed);

    for (let i = 0; i < animations.length; i++) {
      switch (animations[i].length) {
        case 1:
          if (animations[i][0] === 'doneall')
            setTimeout(() => this._makeAllDone(), i * speed);
          break;
        case 2:
          if (animations[i][1] === 'select')
            setTimeout(
              () => this._makeBarSelected(animations[i][0]),
              i * speed
            );
          else if (animations[i][1] === 'done')
            setTimeout(() => this._makeBarDone(animations[i][0]), i * speed);
          else if (animations[i][1] === 'restore')
            setTimeout(() => this._makeBarPrimary(animations[i][0]), i * speed);
          else if (animations[i][1] === 'observe')
            setTimeout(
              () => this._makeBarObserved(animations[i][0]),
              i * speed
            );
          else if (animations[i][1] === 'moved')
            setTimeout(() => this._makeBarMoved(animations[i][0]), i * speed);
          break;
        case 3:
          if (animations[i][2] === 'select')
            setTimeout(() => {
              this._makeBarSelected(animations[i][0]);
              this._makeBarSelected(animations[i][1]);
            }, i * speed);
          else if (animations[i][2] === 'swap-highlight')
            setTimeout(() => {
              this._makeBarSwap(animations[i][0]);
              this._makeBarSwap(animations[i][1]);
            }, i * speed);
          else if (animations[i][2] === 'swap-swap')
            setTimeout(() => {
              this._swapBarHeights(animations[i][0], animations[i][1]);
            }, i * speed);
          else if (animations[i][2] === 'restore')
            setTimeout(() => {
              this._makeBarPrimary(animations[i][0]);
              this._makeBarPrimary(animations[i][1]);
            }, i * speed);
          else if (animations[i][2] === 'restore-select')
            setTimeout(() => {
              this._makeBarPrimary(animations[i][0]);
              this._makeBarSelected(animations[i][1]);
            }, i * speed);
          else if (animations[i][2] === 'observe-restore')
            setTimeout(() => {
              this._makeBarObserved(animations[i][0]);
              this._makeBarPrimary(animations[i][1]);
            }, i * speed);
          else if (animations[i][2] === 'updateheight')
            setTimeout(() => {
              this._updateBarHeight(animations[i][0], animations[i][1]);
            }, i * speed);
          break;
      }
    }
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
  }

  _testSort(sortingAlgorithm) {
    for (let i = 101; i <= 200; i++) {
      let arr = [];
      for (let j = 0; j < i; j++) {
        arr.push(generateRandomNumber(10, 300));
      }
      let arr2 = sortingAlgorithm(arr);
      arr.sort((a, b) => a - b);
      let same = true;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] !== arr2[j]) {
          same = false;
          break;
        }
      }
      console.log(same);
    }
  }

  _makeBarPrimary(id) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    this._barClasses.forEach(el => bar.classList.remove(el));
    bar.classList.add('sorting-container__element--primary');
  }

  _makeBarSelected(id) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    this._barClasses.forEach(el => bar.classList.remove(el));
    bar.classList.add('sorting-container__element--select');
  }

  _makeBarSwap(id) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    this._barClasses.forEach(el => bar.classList.remove(el));
    bar.classList.add('sorting-container__element--swap');
  }

  _makeBarDone(id) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    this._barClasses.forEach(el => bar.classList.remove(el));
    bar.classList.add('sorting-container__element--done');
  }

  _makeAllDone() {
    const bars = [
      ...this._parentElement.querySelectorAll('.sorting-container__element'),
    ];
    bars.forEach(bar => {
      this._barClasses.forEach(el => bar.classList.remove(el));
      bar.classList.add('sorting-container__element--done');
    });
  }

  _makeBarObserved(id) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    this._barClasses.forEach(el => bar.classList.remove(el));
    bar.classList.add('sorting-container__element--observed');
  }

  _makeBarMoved(id) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    this._barClasses.forEach(el => bar.classList.remove(el));
    bar.classList.add('sorting-container__element--moved');
  }

  _getBarHeight(id) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    return bar.style.height;
  }

  _updateBarHeight(id, height) {
    const bar = this._parentElement.querySelector(`#${CSS.escape(id)}`);
    // console.log(`Old height: ${bar.style.height}`);
    bar.style.height = `${height}%`;
    // console.log(`New height: ${bar.style.height}`);
  }

  _swapBarHeights(id1, id2) {
    const bar1 = this._parentElement.querySelector(`#${CSS.escape(id1)}`);
    const bar2 = this._parentElement.querySelector(`#${CSS.escape(id2)}`);
    [bar1.style.height, bar2.style.height] = [
      bar2.style.height,
      bar1.style.height,
    ];
  }

  _disableControls() {
    [
      ...this._sliders,
      this._bubbleSortButton,
      this._selectionSortButton,
      this._insertionSortButton,
      this._mergeSortButton,
      this._quickSortButton,
      this._heapSortButton,
    ].forEach(el => {
      el.attributes.disabled = true;
      el.classList.add('u-disabled');
    });
  }

  _enableControls() {
    this._enableSliders();
    this._enableButtons();
  }

  _enableSliders() {
    [...this._sliders].forEach(el => {
      el.attributes.disabled = false;
      el.classList.remove('u-disabled');
    });
  }

  _enableButtons() {
    [
      this._bubbleSortButton,
      this._selectionSortButton,
      this._insertionSortButton,
      this._mergeSortButton,
      this._quickSortButton,
      this._heapSortButton,
    ].forEach(el => {
      el.attributes.disabled = false;
      el.classList.remove('u-disabled');
    });
  }

  _protectControls(arr, speed) {
    this._disableControls();
    setTimeout(() => this._enableControls(), (arr.length - 1) * speed);
  }

  generateArrayHtml(array) {
    for (let i = 0; i < array.length; i++) {
      const html = `<div id="${i}" class="sorting-container__element sorting-container__element--primary" style="height:${array[i]}%; width:calc(100%/${array.length});"></div>`;
      this._parentElement.insertAdjacentHTML('beforeend', html);
    }
  }
}
