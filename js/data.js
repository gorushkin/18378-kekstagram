'use strict';
(function () {
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

  window.data = {
    Selectors: Selectors
  };

  window.data.getRandomInteger = function (min, max) {
    var randomInteger = Math.floor(Math.random() * (max - min) + min);
    return randomInteger;
  };

  window.data.generateSubCollection = function (inputCollection, size) {
    var tempArray = inputCollection.slice();
    var subArray = [];
    for (var i = 0; i < size; i++) {
      var rnd = window.data.getRandomInteger(0, tempArray.length);
      var tempElement = tempArray.splice(rnd, 1);
      subArray = subArray.concat(tempElement);
    }
    return subArray;
  };
})();
