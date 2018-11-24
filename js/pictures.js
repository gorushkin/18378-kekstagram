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
var NUMBER_OF_COMMENTS = 5;
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
var socialCommentsList = bigPicure.querySelector('.social__comments');
var commentLoader = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_LOADER);

var photosInfoList = [];

var getRandomInteger = function (max, min) {
  if (min === undefined) {
    min = 1;
  }
  var randomdInteger = Math.floor(Math.random() * (max + 1 - min) + min);
  return randomdInteger;
};

var generateNewArrow = function (inputArrow, size) {
  var tempArrow = inputArrow.slice();
  var newArrow = [];
  for (var i = 1; i <= size; i++) {
    var rnd = getRandomInteger(tempArrow.length);
    var tempElement = tempArrow.splice(rnd - 1, 1);
    newArrow = newArrow.concat(tempElement);
  }
  return newArrow;
};

var createPhotoInfo = function (photosNumber) {
  var newPhotoInfo = {};
  newPhotoInfo.url = 'photos/' + photosNumber + '.jpg';
  newPhotoInfo.likes = getRandomInteger(MAX_NUMBER_OF_LIKES, MIN_NUMBER_OF_LIKES);
  newPhotoInfo.comments = generateNewArrow(COMMENTS, getRandomInteger(NUMBER_OF_COMMENTS));
  newPhotoInfo.description = DESCRIPTIONS[getRandomInteger(DESCRIPTIONS.length - 1)];
  return newPhotoInfo;
};

var renderUserPicture = function (photoInfo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector(Selectors.PICTURE_TEMPLATE_IMG).src = photoInfo.url;
  photoElement.querySelector(Selectors.PICTURE_TEMPLATE_LIKES).textContent = photoInfo.likes;
  photoElement.querySelector(Selectors.PICTURE_TEMPLATE_COMMENTS).textContent = photoInfo.comments.length;
  return photoElement;
};

var deleteDomElement = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].remove();
  }
};

var renderBigUserPictureComments = function (n) {
  var newElement = socialComments[0].cloneNode(true);
  newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = 'img/avatar-' + getRandomInteger(6) + '.svg';
  newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = photosInfoList[0].comments[n];
  return newElement;
};

var fillBigUserPicture = function () {
  bigPicure.querySelector(Selectors.BIG_PICTURE_IMG).src = photosInfoList[0].url;
  bigPicure.querySelector(Selectors.BIG_PICTURE_LIKES_COUNT).textContent = photosInfoList[0].likes;
  bigPicure.querySelector(Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = photosInfoList[0].comments.length;
  deleteDomElement(socialComments);
  var fragment = document.createDocumentFragment();
  for (i = 0; i < photosInfoList[0].comments.length; i++) {
    fragment.appendChild(renderBigUserPictureComments(i));
  }
  socialCommentsList.appendChild(fragment);
  bigPicure.querySelector(Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = photosInfoList[0].description;
};

var fragment = document.createDocumentFragment();

for (var i = 1; i <= NUMBER_OF_PHOTOS; i++) {
  photosInfoList.push(createPhotoInfo(i));
  fragment.appendChild(renderUserPicture(photosInfoList[i - 1]));
};

picturesContainer.appendChild(fragment);
bigPicure.classList.remove(HIDE_CLASS);
fillBigUserPicture();
socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);
commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);
