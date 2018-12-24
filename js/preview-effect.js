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

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var Selectors = {
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    EFFECT_LEVEL_LINE: '.effect-level__line',
    EFFECT_LEVEL_PIN: '.effect-level__pin',
    EFFECT_LEVEL_VALUE: '.effect-level__value',
    EFFECT_LEVEL_DEPTH: '.effect-level__depth',
    IMG_UPLOAD_EFFECT_LEVEL: '.img-upload__effect-level',
    IMAGE_UPLOAD_PREVEW: '.img-upload__preview img',
    SCALE_CONTROL_VALUE: '.scale__control--value',
    FILE_UPLOAD_INPUT: '#upload-file'
  };

  var DEFAULT_UNIT = 'px';
  var RELATIVE_UNIT = '%';
  var MIN_EFFECT_LEVEL_VALUE = 0;
  var DISPLAY_NONE_CLASS = 'none';
  var DISPLAY_BLOCK_CLASS = 'block';
  var SCALE_CONTROL_VALUE_STEP = 25;
  var SCALE_CONTROL_VALUE_MIN = 25;
  var SCALE_CONTROL_VALUE_MAX = 100;
  var INCREASE = 1;
  var DECREASE = -1;

  var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
  var effectLevelLine = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_LINE);
  var effectLevelPin = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_PIN);
  var effectLevelValueInput = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_VALUE);
  var effectLevelDepth = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_DEPTH);
  var effectLevelSlider = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_EFFECT_LEVEL);
  var imageUploadPreview = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_PREVEW);
  var scaleControlValue = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_VALUE);
  var fileChooser = document.querySelector(Selectors.FILE_UPLOAD_INPUT);


  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
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
      effectLevelValueInput.value = Math.floor(effectLevelPin.offsetLeft * 100 / barWidth);

      effectLevelDepth.style.width = effectLevelValueInput.value + RELATIVE_UNIT;

      for (var i in Filters) {
        if (imageUploadPreview.className === Filters[i].className) {
          var filterWidth = effectLevelValueInput.value * Filters[i].maxValue / 100;
          imageUploadPreview.style.filter = Filters[i].filter + '(' + filterWidth + Filters[i].filterUnit + ')';
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

  var changeScaleUploadImage = function (sign) {
    scaleControlValue.value = Math.max(
        SCALE_CONTROL_VALUE_MIN, Math.min(
            SCALE_CONTROL_VALUE_MAX, SCALE_CONTROL_VALUE_STEP * sign + Number(scaleControlValue.value)));
    imageUploadPreview.style.transform = 'scale(' + scaleControlValue.value / 100 + ')';
  };

  window.previeweffects = {
    effectsPreivewListHandle: function (element) {
      element.addEventListener('click', function (evt) {
        if (evt.target.tagName === 'INPUT') {
          var effect = evt.target.value.toUpperCase();
          effectLevelSlider.style.display = (Filters[effect].hideSlider) ? DISPLAY_NONE_CLASS : DISPLAY_BLOCK_CLASS;
          imageUploadPreview.className = Filters[effect].className;
          imageUploadPreview.style.filter = null;
          effectLevelPin.style.left = effectLevelLine.offsetWidth + DEFAULT_UNIT;
          effectLevelValueInput.value = effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth;
          effectLevelDepth.style.width = effectLevelValueInput.value + RELATIVE_UNIT;
        }
      });
    },
    scaleControlSmallerHandle: function (element) {
      element.addEventListener('click', function () {
        changeScaleUploadImage(DECREASE);
      });
    },
    scaleControlBiggerHandle: function (element) {
      element.addEventListener('click', function () {
        changeScaleUploadImage(INCREASE);
      });
    },
    filterReset: function (element) {
      element.className = Filters.NONE.className;
      element.style.filter = null;
      effectLevelValueInput.value = 20;
      effectLevelPin.style.left = effectLevelValueInput.value + RELATIVE_UNIT;
      effectLevelDepth.style.width = effectLevelValueInput.value + RELATIVE_UNIT;
    }
  };
})();
