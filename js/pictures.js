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

var NUMBER_OF_PHOTOS = 25;
var MIN_NUMBER_OF_LIKES = 15;
var MAX_NUMBER_OF_LIKES = 200;
var NUMBER_OF_COMMENTS = 2;
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
}

var pictureTemplate =
document.querySelector(Selectors.PICTURE_TEMPLATE).content.querySelector(Selectors.USER_PICTURE);

var picturesContainer = document.querySelector(Selectors.PICTURES_CONTAINER);
var bigPicure = document.querySelector(Selectors.BIG_PICTURE);
var socialCommentCount = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_COUNT);
var socialComments = bigPicure.querySelectorAll(Selectors.SOCIAL_COMMENT);
var commentLoader = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_LOADER);

var photosInfoList = [];

var getRandom = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var generateNewArrow = function (newArrowSize) {
  var newArr = COMMENTS.slice();
  var commentsArr = [];
  for (var i = 1; i <= newArrowSize; i++) {
    var randomNumber = getRandom(0, newArr.length - 1);
    commentsArr.push(newArr[randomNumber]);
    newArr.splice(randomNumber, 1);
  }
  return commentsArr;
};

var createPhotoInfo = function (photosNumber) {
  var newPhotoInfo = {};
  newPhotoInfo.url = 'photos/' + photosNumber + '.jpg';
  newPhotoInfo.likes = getRandom(MAX_NUMBER_OF_LIKES, MIN_NUMBER_OF_LIKES);
  newPhotoInfo.comments = generateNewArrow(NUMBER_OF_COMMENTS);
  newPhotoInfo.description = DESCRIPTIONS[getRandom(DESCRIPTIONS.length - 1)];
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

for (var i = 1; i <= NUMBER_OF_PHOTOS; i++) {
  photosInfoList.push(createPhotoInfo(i));
  fragment.appendChild(renderUserPicture(photosInfoList[i - 1]));
}

var fillBigUserPicture = function () {
  bigPicure.querySelector(Selectors.BIG_PICTURE_IMG).src = photosInfoList[0].url;
  bigPicure.querySelector(Selectors.BIG_PICTURE_LIKES_COUNT).textContent = photosInfoList[0].likes;
  bigPicure.querySelector(Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = photosInfoList[0].comments.length;
  for (i = 0; i < photosInfoList[0].comments.length; i++) {
    socialComments[i].querySelector(Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = 'img/avatar-' + getRandom(6, 1) + '.svg';
    socialComments[i].querySelector(Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = photosInfoList[0].comments[i];
  }
  bigPicure.querySelector(Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = photosInfoList[0].description;
}

picturesContainer.appendChild(fragment);
bigPicure.classList.remove(HIDE_CLASS);
fillBigUserPicture();
socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);
commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);
