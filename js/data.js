'use strict';

(function () {
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

  var LIKES_MIN_COUNT = 15;
  var LIKES_MAX_COUNT = 200;
  var COMMENTS_COUNT = 5;

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

  window.data = {
    createPhotoInfo: createPhotoInfo,
    photosInfoList: photosInfoList,
    getRandomInteger: getRandomInteger
  };

})();
