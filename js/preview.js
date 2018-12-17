'use strict';

(function () {
  var Filters = {
    NONE: {
      className: 'effects__preview--none',
      filter: '',
      maxValue: 0,
      hideSlider: true
    },
    CHROME: {
      className: 'effects__preview--chrome',
      filter: 'grayscale',
      minValue: '0',
      maxValue: '1',
      filterUnit: ''
    },
    SEPIA: {
      className: 'effects__preview--sepia',
      filter: 'sepia',
      minValue: '0',
      maxValue: '1',
      filterUnit: ''
    },
    MARVIN: {
      className: 'effects__preview--marvin',
      filter: 'invert',
      minValue: '0',
      maxValue: '100',
      filterUnit: '%'
    },
    PHOBOS: {
      className: 'effects__preview--phobos',
      filter: 'blur',
      minValue: '0',
      maxValue: '3',
      filterUnit: 'px'
    },
    HEAT: {
      className: 'effects__preview--heat',
      filter: 'brightness',
      minValue: '1',
      maxValue: '3',
      filterUnit: ''
    }
  };

  var Selectors = {
    EFFECTS_PREVIEW_LIST: '.effects__list',
    EFFECTS_PREVIEW_ITEM: '.effects__preview',
    EFFECT_LEVEL_LINE: '.effect-level__line',
    EFFECT_LEVEL_PIN: '.effect-level__pin',
    EFFECT_LEVEL_DEPTH: '.effect-level__depth',
    EFFECT_LEVEL_VALUE: '.effect-level__value',
    SCALE_CONTROL_SMALLER: '.scale__control--smaller',
    SCALE_CONTROL_BIGGER: '.scale__control--bigger',
    SCALE_CONTROL_VALUE: '.scale__control--value',
    IMG_UPLOAD_EFFECT_LEVEL: '.img-upload__effect-level',
  };

  var MIN_EFFECT_LEVEL_VALUE = 0;
  var DEFAULT_UNIT = 'px';
  var RELATIVE_UNIT = '%';
  var DISPLAY_NONE_CLASS = 'none';
  var DISPLAY_BLOCK_CLASS = 'block';
  var INCREASE = 1;
  var DECREASE = -1;
  var SCALE_CONTROL_VALUE_STEP = 25;
  var SCALE_CONTROL_VALUE_MIN = 25;
  var SCALE_CONTROL_VALUE_MAX = 100;

  var effectsPreviewList = window.uploadpopup.imageUploadPopup.querySelector(Selectors.EFFECTS_PREVIEW_LIST);
  var effectLevelLine = window.uploadpopup.imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_LINE);
  var effectLevelPin = window.uploadpopup.imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_PIN);
  var effectLevelDepth = window.uploadpopup.imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_DEPTH);
  var effectLevelSlider = window.uploadpopup.imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_EFFECT_LEVEL);
  var effeectLevelValueInput = window.uploadpopup.imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_VALUE);
  var scaleControlSmaller = window.uploadpopup.imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_SMALLER);
  var scaleControlBigger = window.uploadpopup.imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_BIGGER);
  var scaleControlValue = window.uploadpopup.imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_VALUE);
  // var effectsPreviewItem = window.uploadpopup.imageUploadPopup.querySelectorAll(Selectors.EFFECTS_PREVIEW_ITEM);

  effectsPreviewList.addEventListener('click', function () {
    if (event.target.tagName === 'SPAN') {
      var filterClass = event.target.classList[1];
      // effectLevelSlider.style.display = (filterClass === Filters.NONE.className) ? DISPLAY_NONE_CLASS : DISPLAY_BLOCK_CLASS;
      for (var i in Filters) {
        if (filterClass === Filters[i].className) {
          if (Filters[i].hideSlider) {
            effectLevelSlider.style.display = DISPLAY_NONE_CLASS;
          } else {
            effectLevelSlider.style.display = DISPLAY_BLOCK_CLASS;
          }
        }
      }
      window.uploadpopup.imageUploadPreview.className = filterClass;
      window.uploadpopup.imageUploadPreview.style.filter = null;
      effectLevelPin.style.left = effectLevelLine.offsetWidth + DEFAULT_UNIT;
      effeectLevelValueInput.value = effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth;
      effectLevelDepth.style.width = effeectLevelValueInput.value + RELATIVE_UNIT;
    }
  });

  var changeScaleUploadImage = function (sign) {
    scaleControlValue.value = Math.max(
        SCALE_CONTROL_VALUE_MIN, Math.min(
            SCALE_CONTROL_VALUE_MAX, SCALE_CONTROL_VALUE_STEP * sign + Number(scaleControlValue.value)));
    window.uploadpopup.imageUploadPreview.style.transform = 'scale(' + scaleControlValue.value / 100 + ')';
  };

  scaleControlSmaller.addEventListener('click', function () {
    changeScaleUploadImage(DECREASE);
  });

  scaleControlBigger.addEventListener('click', function () {
    changeScaleUploadImage(INCREASE);
  });

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

      for (var i in Filters) {
        if (window.uploadpopup.imageUploadPreview.className === Filters[i].className) {
          var filterWidth = effeectLevelValueInput.value * Filters[i].maxValue / 100;
          window.uploadpopup.imageUploadPreview.style.filter = Filters[i].filter + '(' + filterWidth + Filters[i].filterUnit + ')';
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

  window.preview = {
    Filters: Filters,
    scaleControlValue: scaleControlValue
  };

})();
