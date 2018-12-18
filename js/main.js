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

  var PHOTOS_COUNT = 25;
  var HIDE_CLASS = 'hidden';
  // var VISUALLY_HIDDEN_CLASS = 'visually-hidden';
  // var DISPLAY_NONE_CLASS = 'none';
  // var DISPLAY_BLOCK_CLASS = 'block';
  var ESC_KEYCODE = 27;
  var DEFAULT_SCALE_CONTROL_VALUE = 100;
  var SCALE_CONTROL_VALUE_STEP = 25;
  var SCALE_CONTROL_VALUE_MIN = 25;
  var SCALE_CONTROL_VALUE_MAX = 100;
  var MAX_HASHTAGS_COUNT = 5;
  var COMMENT_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_FIRST_SYMBOL = '#';
  var INCREASE = 1;
  var DECREASE = -1;
  var COMMENT_INPUT_ERROR_MESSAGE = 'Длина комментария не может составлять больше ' + COMMENT_MAX_LENGTH + ' символов';
  // var MIN_EFFECT_LEVEL_VALUE = 0;
  // var DEFAULT_UNIT = 'px';
  // var RELATIVE_UNIT = '%';

  var HASHTAG_ERRORS_CODE = {
    noErrors: {
      errorCode: 0,
      errorText: ''
    },
    startWithHash: {
      errorCode: 1,
      errorText: 'Хэш-тег должен начинаться с символа ' + HASHTAG_FIRST_SYMBOL
    },
    wrongContent: {
      errorCode: 2,
      errorText: 'Хеш-тег не может состоять только из одной решётки'
    },
    noRepeat: {
      errorCode: 3,
      errorText: 'Один и тот же хэш-тег не может быть использован дважды'
    },
    countLimit: {
      errorCode: 4,
      errorText: 'Нельзя указать больше пяти хэш-тегов'
    },
    lengthLimit: {
      errorCode: 5,
      errorText: 'Максимальная длина одного хэш-тега ' + HASHTAG_MAX_LENGTH + ' символов, включая решётку'
    }
  };

  var Selectors = {
    PICTURES_LIST: '.pictures',
    USER_PICTURE: '.picture',
    BIG_PICTURE: '.big-picture',
    BIG_PICTURE_IMG: '.big-picture__img img',
    BIG_PICTURE_LIKES_COUNT: '.likes-count',
    BIG_PICTURE_COMMENTS_COUNT: '.comments-count',
    BIG_PICTURE_SOCIAL_PICTURE: '.social__picture',
    BIG_PICTURE_SOCIAL_TEXT: '.social__text',
    BIG_PICTURE_SOCIAL_CAPTION: '.social__caption',
    SOCIAL_COMMENT_COUNT: '.social__comment-count',
    SOCIAL_COMMENT: '.social__comment',
    SOCIAL_COMMENTS_LIST: '.social__comments',
    SOCIAL_COMMENT_LOADER: '.social__comments-loader',
    IMAGE_UPLOAD_FORM: '#upload-select-image',
    IMAGE_UPLOAD_INPUT: '#upload-file',
    EFFECT_LEVEL_VALUE: '.effect-level__value',
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    IMAGE_UPLOAD_PREVEW: '.img-upload__preview img',
    IMAGE_UPLOAD_POPUP_CLOSE_BUTTON: '.img-upload__cancel',
    EFFECT_LEVEL_PIN: '.effect-level__pin',
    EFFECT_LEVEL_DEPTH: '.effect-level__depth',
    BIG_PICTURE_CLOSE: '.big-picture__cancel',
    PICTURES_LIST_ITEM: '.picture',
    EFFECTS_PREVIEW_LIST: '.effects__list',
    EFFECTS_PREVIEW_ITEM: '.effects__preview',
    EFFECT_LEVEL_LINE: '.effect-level__line',
    SCALE_CONTROL_SMALLER: '.scale__control--smaller',
    SCALE_CONTROL_BIGGER: '.scale__control--bigger',
    SCALE_CONTROL_VALUE: '.scale__control--value',
    IMAGE_UPLOAD_HASHTAGS: '.text__hashtags',
    IMG_UPLOAD_SUBMIT: '.img-upload__submit',
    IMG_UPLOAD_COMMENT: '.text__description',
    IMG_UPLOAD_EFFECT_LEVEL: '.img-upload__effect-level'
  };

  window.main = {
    Selectors: Selectors
  };

  var picturesContainer = document.querySelector(Selectors.PICTURES_LIST);
  var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
  var imageUploadForm = document.querySelector(Selectors.IMAGE_UPLOAD_FORM);
  var imageUploadInput = document.querySelector(Selectors.IMAGE_UPLOAD_INPUT);
  var imageUploadCloseButton = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_POPUP_CLOSE_BUTTON);
  var imageUploadPreview = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_PREVEW);
  var effectsPreivewList = imageUploadPopup.querySelector(Selectors.EFFECTS_PREVIEW_LIST);
  // var effectLevelLine = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_LINE);
  // var effectLevelPin = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_PIN);
  // var effeectLevelValueInput = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_VALUE);
  var scaleControlSmaller = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_SMALLER);
  var scaleControlBigger = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_BIGGER);
  var scaleControlValue = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_VALUE);
  var hashtagsInput = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_HASHTAGS);
  var commentInput = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_COMMENT);
  // var effectLevelDepth = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_DEPTH);
  // var effectLevelSlider = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_EFFECT_LEVEL);

  window.main.imageUploadPopup = imageUploadPopup;

  var photosInfoList = [];

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photosInfoList.push(window.createPhotoInfo(i + 1));
    fragment.appendChild(window.renderUserPicture(photosInfoList[i]));
  }

  picturesContainer.appendChild(fragment);

  var openUploadPopup = function () {
    imageUploadPopup.classList.remove(HIDE_CLASS);
    document.addEventListener('keydown', window.onPopupKeyPress);
    scaleControlValue.value = DEFAULT_SCALE_CONTROL_VALUE;
    imageUploadPreview.style.transform = 'scale(' + DEFAULT_SCALE_CONTROL_VALUE / 100 + ')';
  };

  var closeUploadPopup = function () {
    imageUploadPopup.classList.add(HIDE_CLASS);
    document.removeEventListener('keydown', window.onPopupKeyPress);
    imageUploadForm.reset();
    imageUploadPreview.style.filter = FILTERS.none;
  };

  imageUploadInput.addEventListener('change', openUploadPopup);
  imageUploadCloseButton.addEventListener('click', closeUploadPopup);


  window.onPopupKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE
      && evt.target.tagName !== 'INPUT'
      && evt.target.tagName !== 'TEXTAREA') {
      window.closeBigPicture();
      closeUploadPopup();
    }
  };

  var picturesList = picturesContainer.querySelectorAll(Selectors.PICTURES_LIST_ITEM);

  var openThumbnailImage = function (n) {
    picturesList[n].addEventListener('click', function () {
      window.renderBigUserPicture(photosInfoList[n]);
      window.openBigPicture();
    });
  };

  for (i = 0; i < picturesList.length; i++) {
    openThumbnailImage(i);
  }

  // effectsPreivewList.addEventListener('click', function () {
  //   if (event.target.tagName === 'SPAN') {
  //     var filterClass = event.target.classList[1];
  //     effectLevelSlider.style.display = (filterClass === FILTERS.none.className) ? DISPLAY_NONE_CLASS : DISPLAY_BLOCK_CLASS;
  //     imageUploadPreview.className = filterClass;
  //     imageUploadPreview.style.filter = null;
  //     effectLevelPin.style.left = effectLevelLine.offsetWidth + DEFAULT_UNIT;
  //     effeectLevelValueInput.value = effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth;
  //     effectLevelDepth.style.width = effeectLevelValueInput.value + RELATIVE_UNIT;
  //   }
  // });

  window.effectsPreivewListHeadler(effectsPreivewList);

  var changeScaleUploadImage = function (sign) {
    scaleControlValue.value = Math.max(
        SCALE_CONTROL_VALUE_MIN, Math.min(
            SCALE_CONTROL_VALUE_MAX, SCALE_CONTROL_VALUE_STEP * sign + Number(scaleControlValue.value)));
    imageUploadPreview.style.transform = 'scale(' + scaleControlValue.value / 100 + ')';
  };

  scaleControlSmaller.addEventListener('click', function () {
    changeScaleUploadImage(DECREASE);
  });

  scaleControlBigger.addEventListener('click', function () {
    changeScaleUploadImage(INCREASE);
  });

  var checkHashTagsCollection = function (line) {
    if (line.length > MAX_HASHTAGS_COUNT) {
      return HASHTAG_ERRORS_CODE.countLimit;
    }
    for (i = 0; i < line.length; i++) {
      for (var j = 0; j < line.length; j++) {
        if (line[i] === line[j] && i !== j) {
          return HASHTAG_ERRORS_CODE.noRepeat;
        }
      }
      if (line[i][0] !== HASHTAG_FIRST_SYMBOL) {
        return HASHTAG_ERRORS_CODE.startWithHash;
      } else if (line[i].length > HASHTAG_MAX_LENGTH) {
        return HASHTAG_ERRORS_CODE.lengthLimit;
      } else if (line[i].length === 1 && line[i][0] === HASHTAG_FIRST_SYMBOL) {
        return HASHTAG_ERRORS_CODE.wrongContent;
      }
    }
    return HASHTAG_ERRORS_CODE.noErrors;
  };

  hashtagsInput.addEventListener('input', function (hashtagEvt) {
    hashtagEvt.preventDefault();
    var array = hashtagsInput.value.toLowerCase().split(' ');
    hashtagsInput.setCustomValidity(checkHashTagsCollection(array).errorText);
  });

  commentInput.addEventListener('input', function (commentEvt) {
    commentEvt.preventDefault();
    if (commentInput.value.length > COMMENT_MAX_LENGTH) {
      commentInput.setCustomValidity(COMMENT_INPUT_ERROR_MESSAGE);
    } else {
      commentInput.setCustomValidity('');
    }
  });

  // effectLevelPin.addEventListener('mousedown', function (evt) {
  //   var effectLevelLineCoords = effectLevelLine.getBoundingClientRect();
  //   var barWidth = effectLevelLine.offsetWidth;
  //   var startCoords = evt.clientX;
  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();
  //     var shift = startCoords - moveEvt.clientX;
  //     startCoords = moveEvt.clientX;
  //     if (moveEvt.clientX > effectLevelLineCoords.right) {
  //       effectLevelPin.style.left = barWidth + DEFAULT_UNIT;
  //       startCoords = effectLevelLineCoords.right;
  //     } else if (moveEvt.clientX < effectLevelLineCoords.left) {
  //       effectLevelPin.style.left = MIN_EFFECT_LEVEL_VALUE + DEFAULT_UNIT;
  //       startCoords = effectLevelLineCoords.left;
  //     } else {
  //       effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + DEFAULT_UNIT;
  //     }
  //     effeectLevelValueInput.value = effectLevelPin.offsetLeft * 100 / barWidth;

  //     effectLevelDepth.style.width = effeectLevelValueInput.value + RELATIVE_UNIT;

  //     for (i in FILTERS) {
  //       if (imageUploadPreview.className === FILTERS[i].className) {
  //         var filterWidth = effeectLevelValueInput.value * FILTERS[i].maxValue / 100;
  //         imageUploadPreview.style.filter = FILTERS[i].filter + '(' + filterWidth + FILTERS[i].filterUnit + ')';
  //       }
  //     }

  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);

  // });

})();
