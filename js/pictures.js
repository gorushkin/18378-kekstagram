'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

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

var PHOTOS_COUNT = 25;
var LIKES_MIN_COUNT = 15;
var LIKES_MAX_COUNT = 200;
var COMMENTS_COUNT = 5;
var HIDE_CLASS = 'hidden';
var VISUALLY_HIDDEN_CLASS = 'visually-hidden';
var DISPLAY_NONE_CLASS = 'none';
var DISPLAY_BLOCK_CLASS = 'block';
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
var MIN_EFFECT_LEVEL_VALUE = 0;
var DEFAULT_UNIT = 'px';
var RELATIVE_UNIT = '%';

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
  PICTURE_TEMPLATE: '#picture',
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
  PICTURE_TEMPLATE_IMG: '.picture__img',
  PICTURE_TEMPLATE_LIKES: '.picture__likes',
  PICTURE_TEMPLATE_COMMENTS: '.picture__comments',
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

var pictureTemplate =
document.querySelector(Selectors.PICTURE_TEMPLATE).content.querySelector(Selectors.USER_PICTURE);

var picturesContainer = document.querySelector(Selectors.PICTURES_LIST);
var bigPicure = document.querySelector(Selectors.BIG_PICTURE);
var socialCommentCount = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_COUNT);
var socialComments = bigPicure.querySelectorAll(Selectors.SOCIAL_COMMENT);
var commentLoader = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_LOADER);
var bigPictureClose = bigPicure.querySelector(Selectors.BIG_PICTURE_CLOSE);
var socialCommentsList = bigPicure.querySelector(Selectors.SOCIAL_COMMENTS_LIST);
var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
var imageUploadForm = document.querySelector(Selectors.IMAGE_UPLOAD_FORM);
var imageUploadInput = document.querySelector(Selectors.IMAGE_UPLOAD_INPUT);
var imageUploadCloseButton = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_POPUP_CLOSE_BUTTON);
var imageUploadPreview = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_PREVEW);
var effectsPreivewList = imageUploadPopup.querySelector(Selectors.EFFECTS_PREVIEW_LIST);
var effectLevelLine = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_LINE);
var effectLevelPin = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_PIN);
var effeectLevelValueInput = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_VALUE);
var scaleControlSmaller = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_SMALLER);
var scaleControlBigger = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_BIGGER);
var scaleControlValue = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_VALUE);
var hashtagsInput = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_HASHTAGS);
var commentInput = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_COMMENT);
var effectLevelDepth = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_DEPTH);
var effectLevelSlider = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_EFFECT_LEVEL);

var photosInfoList = [];

var getRandomInteger = function (min, max) {
  var randomInteger = Math.floor(Math.random() * (max - min) + min);
  return randomInteger;
};

var generateSubCollection = function (inputCollection, size) {
  var tempArray = inputCollection.slice();
  var subArray = [];
  for (var i = 0; i < size; i++) {
    var rnd = getRandomInteger(0, tempArray.length);
    var tempElement = tempArray.splice(rnd, 1);
    subArray = subArray.concat(tempElement);
  }
  return subArray;
};

var createPhotoInfo = function (photosNumber) {
  var newPhotoInfo = {};
  newPhotoInfo.url = 'photos/' + photosNumber.toString() + '.jpg';
  newPhotoInfo.likes = getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT + 1);
  newPhotoInfo.comments = generateSubCollection(COMMENTS, getRandomInteger(1, COMMENTS_COUNT + 1));
  newPhotoInfo.description = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length)];
  return newPhotoInfo;
};

var renderUserPicture = function (photoInfo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector(Selectors.PICTURE_TEMPLATE_IMG).src = photoInfo.url;
  photoElement.querySelector(Selectors.PICTURE_TEMPLATE_LIKES).textContent = photoInfo.likes;
  photoElement.querySelector(Selectors.PICTURE_TEMPLATE_COMMENTS).textContent = photoInfo.comments.length;
  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < PHOTOS_COUNT; i++) {
  photosInfoList.push(createPhotoInfo(i + 1));
  fragment.appendChild(renderUserPicture(photosInfoList[i]));
}

var renderBigUserPictureComments = function (n, picture) {
  var newElement = socialComments[0].cloneNode(true);
  newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = 'img/avatar-' + getRandomInteger(1, 7).toString() + '.svg';
  newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = picture.comments[n];
  return newElement;
};

var renderBigUserPicture = function (picture) {
  socialCommentsList.innerHTML = '';
  bigPicure.querySelector(Selectors.BIG_PICTURE_IMG).src = picture.url;
  bigPicure.querySelector(Selectors.BIG_PICTURE_LIKES_COUNT).textContent = picture.likes;
  bigPicure.querySelector(Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = picture.comments.length;
  fragment = document.createDocumentFragment();
  for (i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(renderBigUserPictureComments(i, picture));
  }
  socialCommentsList.appendChild(fragment);
  bigPicure.querySelector(Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = picture.description;
};

picturesContainer.appendChild(fragment);
socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);
commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);

var openUploadPopup = function () {
  imageUploadPopup.classList.remove(HIDE_CLASS);
  document.addEventListener('keydown', onPopupKeyPress);
  scaleControlValue.value = DEFAULT_SCALE_CONTROL_VALUE;
  imageUploadPreview.style.transform = 'scale(' + DEFAULT_SCALE_CONTROL_VALUE / 100 + ')';
};

var closeUploadPopup = function () {
  imageUploadPopup.classList.add(HIDE_CLASS);
  document.removeEventListener('keydown', onPopupKeyPress);
  imageUploadForm.reset();
  imageUploadPreview.style.filter = Filters.NONE;
};

imageUploadInput.addEventListener('change', openUploadPopup);
imageUploadCloseButton.addEventListener('click', closeUploadPopup);


var onPopupKeyPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE
    && evt.target.tagName !== 'INPUT'
    && evt.target.tagName !== 'TEXTAREA') {
    closeBigPicture();
    closeUploadPopup();
  }
};

var openBigPicture = function () {
  bigPicure.classList.remove(HIDE_CLASS);
  document.addEventListener('keydown', onPopupKeyPress);
};

var closeBigPicture = function () {
  bigPicure.classList.add(HIDE_CLASS);
  document.removeEventListener('keydown', onPopupKeyPress);
};

bigPictureClose.addEventListener('click', closeBigPicture);

var picturesList = picturesContainer.querySelectorAll(Selectors.PICTURES_LIST_ITEM);

var openThumbnailImage = function (n) {
  picturesList[n].addEventListener('click', function () {
    renderBigUserPicture(photosInfoList[n]);
    openBigPicture();
  });
};

for (i = 0; i < picturesList.length; i++) {
  openThumbnailImage(i);
}

effectsPreivewList.addEventListener('click', function () {
  if (event.target.tagName === 'SPAN') {
    var filterClass = event.target.classList[1];
    effectLevelSlider.style.display = (filterClass === Filters.NONE.className) ? DISPLAY_NONE_CLASS : DISPLAY_BLOCK_CLASS;
    imageUploadPreview.className = filterClass;
    imageUploadPreview.style.filter = null;
    effectLevelPin.style.left = effectLevelLine.offsetWidth + DEFAULT_UNIT;
    effeectLevelValueInput.value = effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth;
    effectLevelDepth.style.width = effeectLevelValueInput.value + RELATIVE_UNIT;
  }
});

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

    for (i in Filters) {
      if (imageUploadPreview.className === Filters[i].className) {
        var filterWidth = effeectLevelValueInput.value * Filters[i].maxValue / 100;
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
