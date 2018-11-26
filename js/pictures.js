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

var PHOTOS_COUNT = 25;
var LIKES_MIN_COUNT = 15;
var LIKES_MAX_COUNT = 200;
var COMMENTS_COUNT = 2;
var HIDE_CLASS = 'hidden';
var VISUALLY_HIDDEN_CLASS = 'visually-hidden';

var Selectors = {
  PICTURES_CONTAINER: '.pictures',
  PICTURE_TEMPLATE: '#picture',
  USER_PICTURE: '.picture',
  BIG_PICTURE: '.big-picture',
  BIG_PICTURE_IMG: '.big-picture__img',
  BIG_PICTURE_LIKES_COUNT: '.likes-count',
  BIG_PICTURE_COMMENTS_COUNT: '.comments-count',
  BIG_PICTURE_SOCIAL_PICTURE: '.social__picture',
  BIG_PICTURE_SOCIAL_TEXT: '.social__text',
  BIG_PICTURE_SOCIAL_CAPTION: '.social__caption',
  SOCIAL_COMMENT_COUNT: '.social__comment-count',
  SOCIAL_COMMENT: '.social__comment',
  SOCIAL_COMMENT_LOADER: '.social__comments-loader',
  PICTURE_TEMPLATE_IMG: '.picture__img',
  PICTURE_TEMPLATE_LIKES: '.picture__likes',
  PICTURE_TEMPLATE_COMMENTS: '.picture__comments'
};

var pictureTemplate =
document.querySelector(Selectors.PICTURE_TEMPLATE).content.querySelector(Selectors.USER_PICTURE);

var picturesContainer = document.querySelector(Selectors.PICTURES_CONTAINER);
var bigPicure = document.querySelector(Selectors.BIG_PICTURE);
var socialCommentCount = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_COUNT);
var socialComments = bigPicure.querySelectorAll(Selectors.SOCIAL_COMMENT);
var commentLoader = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_LOADER);

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

var fillBigUserPicture = function () {
  bigPicure.querySelector(Selectors.BIG_PICTURE_IMG).src = photosInfoList[0].url;
  bigPicure.querySelector(Selectors.BIG_PICTURE_LIKES_COUNT).textContent = photosInfoList[0].likes;
  bigPicure.querySelector(Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = photosInfoList[0].comments.length;
  for (i = 0; i < photosInfoList[0].comments.length; i++) {
    socialComments[i].querySelector(Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = 'img/avatar-' + getRandomInteger(1, 7).toString() + '.svg';
    socialComments[i].querySelector(Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = photosInfoList[0].comments[i];
  }
  bigPicure.querySelector(Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = photosInfoList[0].description;
};

picturesContainer.appendChild(fragment);
bigPicure.classList.remove(HIDE_CLASS);
fillBigUserPicture();
socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);
commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);
