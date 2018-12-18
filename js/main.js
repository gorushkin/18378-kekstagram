'use strict';
(function () {
  var PHOTOS_COUNT = 25;
  var ESC_KEYCODE = 27;
  var HASHTAG_INPUT_NAME = 'hashtags';
  var DESCRIPTION_INPUT_NAME = 'description';

  var Selectors = {
    PICTURES_LIST: '.pictures',
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    PICTURES_LIST_ITEM: '.picture',
    IMAGE_UPLOAD_HASHTAGS: '.text__hashtags',
    IMG_UPLOAD_COMMENT: '.text__description',
  };

  var picturesContainer = document.querySelector(Selectors.PICTURES_LIST);
  var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
  var hashtagsInput = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_HASHTAGS);
  var commentInput = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_COMMENT);

  window.main = {
    getRandomInteger: function (min, max) {
      var randomInteger = Math.floor(Math.random() * (max - min) + min);
      return randomInteger;
    },
    generateSubCollection: function (inputCollection, size) {
      var tempArray = inputCollection.slice();
      var subArray = [];
      for (var i = 0; i < size; i++) {
        var rnd = window.main.getRandomInteger(0, tempArray.length);
        var tempElement = tempArray.splice(rnd, 1);
        subArray = subArray.concat(tempElement);
      }
      return subArray;
    },
    onPopupKeyPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE
        && evt.target.tagName !== HASHTAG_INPUT_NAME
        && evt.target.tagName !== DESCRIPTION_INPUT_NAME) {
        window.fullimagewindows.closeBigPicture();
        window.editorwindow.closeUploadPopup();
      }
    }
  };

  imageUploadPopup = imageUploadPopup;

  var photosInfoList = [];

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photosInfoList.push(window.thumbnails.createPhotoInfo(i + 1));
    fragment.appendChild(window.thumbnails.renderUserPicture(photosInfoList[i]));
  }

  picturesContainer.appendChild(fragment);

  var picturesList = picturesContainer.querySelectorAll(Selectors.PICTURES_LIST_ITEM);

  var openThumbnailImage = function (n) {
    picturesList[n].addEventListener('click', function () {
      window.fullimagewindows.renderBigUserPicture(photosInfoList[n]);
      window.fullimagewindows.openBigPicture();
    });
  };

  for (i = 0; i < picturesList.length; i++) {
    openThumbnailImage(i);
  }

  window.validationinput.hashtagsInputHandle(hashtagsInput);
  window.validationinput.commentInputHandle(commentInput);
})();
