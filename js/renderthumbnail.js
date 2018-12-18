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


  window.createPhotoInfo = function (elementCount) {
    var newPhotoInfo = {};
    newPhotoInfo.url = 'photos/' + elementCount.toString() + '.jpg';
    newPhotoInfo.likes = window.getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT + 1);
    newPhotoInfo.comments = window.generateSubCollection(COMMENTS, window.getRandomInteger(1, COMMENTS_COUNT + 1));
    newPhotoInfo.description = DESCRIPTIONS[window.getRandomInteger(0, DESCRIPTIONS.length)];
    return newPhotoInfo;
  };

})();
