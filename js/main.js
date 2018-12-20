'use strict';

(function () {
  var Selectors = {
    PICTURES_LIST: '.pictures',
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    PICTURES_LIST_ITEM: '.picture',
    IMAGE_UPLOAD_HASHTAGS: '.text__hashtags',
    IMG_UPLOAD_COMMENT: '.text__description',
  };

  var GETURL = 'https://js.dump.academy/kekstagram/data';


  var picturesContainer = document.querySelector(Selectors.PICTURES_LIST);
  var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
  var hashtagsInput = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_HASHTAGS);
  var commentInput = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_COMMENT);

  imageUploadPopup = imageUploadPopup;

  var fragment = document.createDocumentFragment();

  var onSuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.thumbnails.renderUserPicture(data[i]));
    }

    picturesContainer.appendChild(fragment);
    var picturesList = picturesContainer.querySelectorAll(Selectors.PICTURES_LIST_ITEM);

    var openThumbnailImage = function (n) {
      picturesList[n].addEventListener('click', function () {
        window.fullimagewindows.renderBigUserPicture(data[n]);
        window.fullimagewindows.openBigPicture();
      });
    };

    for (i = 0; i < picturesList.length; i++) {
      openThumbnailImage(i);
    }

  };

  var onError = function (f) {
    console.log(f);

  };

  window.main(GETURL, 'GET', onSuccess, onError);

  window.validationinput.hashtagsInputHandle(hashtagsInput);
  window.validationinput.commentInputHandle(commentInput);

})();
