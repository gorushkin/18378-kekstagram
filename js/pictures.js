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

var FILTERS = [
  {
    className: 'effects__preview--none',
    filer: ''
  },
  {
    className: 'effects__preview--chrome',
    filer: 'grayscale(100%)'
  },
  {
    className: 'effects__preview--sepia',
    filer: 'sepia(100%)'
  },
  {
    className: 'effects__preview--marvin',
    filer: 'invert(100%)'
  },
  {
    className: 'effects__preview--phobos',
    filer: 'blur(5px)'
  },
  {
    className: 'effects__preview--heat',
    filer: 'brightness(3)'
  }
];

var PHOTOS_COUNT = 25;
var LIKES_MIN_COUNT = 15;
var LIKES_MAX_COUNT = 200;
var COMMENTS_COUNT = 5;
var HIDE_CLASS = 'hidden';
var VISUALLY_HIDDEN_CLASS = 'visually-hidden';
var ESC_KEYCODE = 27;

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
  EFFECT_LEVEL_LINE: '.effect-level__line'
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
// var effectsPreivewItem = imageUploadPopup.querySelectorAll(Selectors.EFFECTS_PREVIEW_ITEM);
var effectLevelLine = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_LINE);
var effectLevelPin = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_PIN);
// var effectLevelValue = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_VALUE);
// var effectLevelDepth = imageUploadPopup.querySelector(Selectors.EFFECT_LEVEL_DEPTH);

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

var fillBigUserPicture = function (picture) {
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
};

var closeUploadPopup = function () {
  imageUploadPopup.classList.add(HIDE_CLASS);
  document.removeEventListener('keydown', onPopupKeyPress);
  imageUploadForm.reset();
};

imageUploadInput.addEventListener('change', openUploadPopup);
imageUploadCloseButton.addEventListener('click', closeUploadPopup);
openUploadPopup();

effectLevelPin.addEventListener('mouseup', function () {
  var leftPinMargin = effectLevelPin.offsetLeft;
  var barWidth = effectLevelLine.offsetWidth;
  var filterDepthValue = leftPinMargin * 100 / barWidth;
});

var onPopupKeyPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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

var smallPictureHandler = function (n) {
  picturesList[n].addEventListener('click', function () {
    fillBigUserPicture(photosInfoList[n]);
    openBigPicture();
  });
};

for (i = 0; i < picturesList.length; i++) {
  smallPictureHandler(i);
}


effectsPreivewList.addEventListener('click', function () {
  if (event.target.tagName === 'SPAN') {
    var filterClassList = event.target.classList;
    if (filterClassList[1] === FILTERS[1].className) {
      imageUploadPreview.style.filter = FILTERS[1].filer;
    } else if (filterClassList[1] === FILTERS[2].className) {
      imageUploadPreview.style.filter = FILTERS[2].filer;
    } else if (filterClassList[1] === FILTERS[3].className) {
      imageUploadPreview.style.filter = FILTERS[3].filer;
    } else if (filterClassList[1] === FILTERS[4].className) {
      imageUploadPreview.style.filter = FILTERS[4].filer;
    } else if (filterClassList[1] === FILTERS[5].className) {
      imageUploadPreview.style.filter = FILTERS[5].filer;
    } else if (filterClassList[1] === FILTERS[0].className) {
      imageUploadPreview.style.filter = FILTERS[0].filer;
    }
  }
});
