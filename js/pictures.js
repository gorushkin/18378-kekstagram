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

var NUMBERS_OF_PHOTOS = 25;
var MIN_LIKES_AMOUNT = 15;
var MAX_LIKES_AMOUNT = 200;
var NUMBER_OF_COMMENTS = 2;
var PICURES_CONTAINER = '.pictures';
var PICTURE_TEMPLATE = '#picture';
var USER_PICTURE = '.picture';
var HIDE_SELECTOR = 'hidden';
var VISUALLY_HIDDEN_SELECTOR = '.visually-hidden';
var BIG_PICTURE = '.big-picture';

var pictureTemplate =
document.querySelector(PICTURE_TEMPLATE).content.querySelector(USER_PICTURE);

var picturesContainer = document.querySelector(PICURES_CONTAINER);
var bigPicure = document.querySelector(BIG_PICTURE);
var socialCommentCount = bigPicure.querySelector('.social__comment-count');
var socialComments = bigPicure.querySelectorAll('.social__comment');
var commentLoader = bigPicure.querySelectorAll('.comments-loader');

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
  newPhotoInfo.likes = getRandom(MAX_LIKES_AMOUNT, MIN_LIKES_AMOUNT);
  newPhotoInfo.comments = generateNewArrow(NUMBER_OF_COMMENTS);
  newPhotoInfo.description = DESCRIPTIONS[getRandom(DESCRIPTIONS.length - 1)];
  return newPhotoInfo;
};

var renderUserPicture = function (photoInfo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoInfo.url;
  photoElement.querySelector('.picture__likes').textContent = photoInfo.likes;
  photoElement.querySelector('.picture__comments').textContent = photoInfo.comments.length;
  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var i = 1; i <= NUMBERS_OF_PHOTOS; i++) {
  photosInfoList.push(createPhotoInfo(i));
  fragment.appendChild(renderUserPicture(photosInfoList[i - 1]));
}

var fillBigUserPicture = function () {
  bigPicure.querySelector('.big-picture__img').src = photosInfoList[0].url;
  bigPicure.querySelector('.likes-count').textContent = photosInfoList[0].likes;
  bigPicure.querySelector('.comments-count').textContent = photosInfoList[0].comments.length;
  for (i = 0; i < photosInfoList[0].comments.length; i++) {
    socialComments[i].querySelector('.social__picture').src = 'img/avatar-' + getRandom(6, 1) + '.svg';
    socialComments[i].querySelector('.social__text').textContent = photosInfoList[0].comments[i];
  }
  bigPicure.querySelector('.social__caption').textContent = photosInfoList[0].description;
}

picturesContainer.appendChild(fragment);
bigPicure.classList.remove(HIDE_SELECTOR);
fillBigUserPicture();
socialCommentCount.classList.add(VISUALLY_HIDDEN_SELECTOR);
commentLoader.classList.add(VISUALLY_HIDDEN_SELECTOR);
