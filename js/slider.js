'use strict';

(function () {
  var FILTERS = {
    none: {
      className: 'effects__preview--none',
      filter: '',
      maxValue: 0
    },
    chrome: {
      className: 'effects__preview--chrome',
      filter: 'grayscale',
      minValue: '0',
      maxValue: '1',
      filterUnit: ''
    },
    sepia: {
      className: 'effects__preview--sepia',
      filter: 'sepia',
      minValue: '0',
      maxValue: '1',
      filterUnit: ''
    },
    marvin: {
      className: 'effects__preview--marvin',
      filter: 'invert',
      minValue: '0',
      maxValue: '100',
      filterUnit: '%'
    },
    phobos: {
      className: 'effects__preview--phobos',
      filter: 'blur',
      minValue: '0',
      maxValue: '3',
      filterUnit: 'px'
    },
    heat: {
      className: 'effects__preview--heat',
      filter: 'brightness',
      minValue: '1',
      maxValue: '3',
      filterUnit: ''
    }
  };

  var DEFAULT_UNIT = 'px';
  var RELATIVE_UNIT = '%';
  var MIN_EFFECT_LEVEL_VALUE = 0;
  var DISPLAY_NONE_CLASS = 'none';
  var DISPLAY_BLOCK_CLASS = 'block';

  var imageUploadPopup = document.querySelector(window.data.Selectors.IMAGE_UPLOAD_POPUP);
  var effectLevelLine = imageUploadPopup.querySelector(window.data.Selectors.EFFECT_LEVEL_LINE);
  var effectLevelPin = imageUploadPopup.querySelector(window.data.Selectors.EFFECT_LEVEL_PIN);
  var effeectLevelValueInput = imageUploadPopup.querySelector(window.data.Selectors.EFFECT_LEVEL_VALUE);
  var effectLevelDepth = imageUploadPopup.querySelector(window.data.Selectors.EFFECT_LEVEL_DEPTH);
  var effectLevelSlider = imageUploadPopup.querySelector(window.data.Selectors.IMG_UPLOAD_EFFECT_LEVEL);
  var imageUploadPreview = imageUploadPopup.querySelector(window.data.Selectors.IMAGE_UPLOAD_PREVEW);

  window.effectsPreivewListHeadler = function (element) {
    element.addEventListener('click', function () {
      if (event.target.tagName === 'SPAN') {
        var filterClass = event.target.classList[1];
        effectLevelSlider.style.display = (filterClass === FILTERS.none.className) ? DISPLAY_NONE_CLASS : DISPLAY_BLOCK_CLASS;
        imageUploadPreview.className = filterClass;
        imageUploadPreview.style.filter = null;
        effectLevelPin.style.left = effectLevelLine.offsetWidth + DEFAULT_UNIT;
        effeectLevelValueInput.value = effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth;
        effectLevelDepth.style.width = effeectLevelValueInput.value + RELATIVE_UNIT;
      }
    });
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var effectLevelLineCoords = effectLevelLine.getBoundingClientRect();
    var barWidth = effectLevelLine.offsetWidth;
    var startCoords = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      if (moveEvt.clientX > effectLevelLineCoords.right) {
        effectLevelPin.style.left = barWidth + DEFAULT_UNIT;
        startCoords = effectLevelLineCoords.right;
      } else if (moveEvt.clientX < effectLevelLineCoords.left) {
        effectLevelPin.style.left = MIN_EFFECT_LEVEL_VALUE + DEFAULT_UNIT;
        startCoords = effectLevelLineCoords.left;
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + DEFAULT_UNIT;
      }
      effeectLevelValueInput.value = effectLevelPin.offsetLeft * 100 / barWidth;

      effectLevelDepth.style.width = effeectLevelValueInput.value + RELATIVE_UNIT;

      for (var i in FILTERS) {
        if (imageUploadPreview.className === FILTERS[i].className) {
          var filterWidth = effeectLevelValueInput.value * FILTERS[i].maxValue / 100;
          imageUploadPreview.style.filter = FILTERS[i].filter + '(' + filterWidth + FILTERS[i].filterUnit + ')';
        }
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
