'use strict';

(function () {
  var PHOTOS_COUNT = 25;
  var URL = 'https://js.dump.academy/kekstagram/data';


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

  imageUploadPopup = imageUploadPopup;

  var photosInfoList = [];

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photosInfoList.push(window.thumbnails.createPhotoInfo(i + 1));
    fragment.appendChild(window.thumbnails.renderUserPicture(photosInfoList[i]));
  }

  var onSuccess = function (data) {
    console.log(data);
  };

  var onError = function (message) {
    console.log(message);
  };


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

  window.backend.load(URL, onSuccess, onError);
})();
