'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var IMG_FILTERS_BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
  var IMAGE_TAG = 'A';
  var IMG_FILTERS_INACTIVE_CLASS = 'img-filters--inactive';

  var Selectors = {
    PICTURES_LIST: '.pictures',
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    PICTURES_LIST_ITEM: '.picture',
    IMAGE_UPLOAD_HASHTAGS: '.text__hashtags',
    IMG_UPLOAD_COMMENT: '.text__description',
    IMG_FILTERS: '.img-filters',
    IMG_FILTERS_BUTTONS: '.img-filters__button'
  };

  var GETURL = 'https://javascript.pages.academy/kekstagram/data';

  var ImgFilter = {
    POPULAR: {
      filterId: 'filter-popular',
      sortMethod: function (data) {
        return data;
      }
    },
    NEW: {
      filterId: 'filter-new',
      sortMethod: function (data) {
        return window.util.generateSubCollection(data, 10);
      }
    },
    DISCUSSED: {
      filterId: 'filter-discussed',
      sortMethod: function (data) {
        return window.util.sortCollection(data);
      }
    }
  };

  var picturesContainer = document.querySelector(Selectors.PICTURES_LIST);
  var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
  var imageFltersContainer = document.querySelector(Selectors.IMG_FILTERS);
  var imageFltersBottons = imageFltersContainer.querySelectorAll(Selectors.IMG_FILTERS_BUTTONS);
  var hashtagsInput = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_HASHTAGS);
  var commentInput = imageUploadPopup.querySelector(Selectors.IMG_UPLOAD_COMMENT);

  var fragment = document.createDocumentFragment();

  var lastTimeout;
  var countPictureLoad = 0;
  var renderPictureList = function (data) {

    var myCountFunc = function () {
      countPictureLoad++;
      if (countPictureLoad === data.length) {
        imageFltersContainer.classList.remove(IMG_FILTERS_INACTIVE_CLASS);
      }
    };

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
      picturesList[i].querySelector('img').onload = function () {
        myCountFunc();
      };
      picturesList[i].querySelector('img').onerror = function () {
        myCountFunc();
      };
      openThumbnailImage(i);
    }
  };

  var onSuccess = function (data) {

    renderPictureList(data);

    imageFltersContainer.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        imageFltersBottons.forEach(function (it) {
          it.classList.remove(IMG_FILTERS_BUTTON_ACTIVE_CLASS);
        });
        evt.target.classList.add(IMG_FILTERS_BUTTON_ACTIVE_CLASS);
        for (var i = picturesContainer.children.length - 1; i >= 0; i--) {
          if (picturesContainer.children[i].tagName === IMAGE_TAG) {
            picturesContainer.children[i].remove();
          }
        }
        var filterId = evt.target.id.toUpperCase().split('-')[1];
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          renderPictureList(ImgFilter[filterId].sortMethod(data));
        }, DEBOUNCE_INTERVAL);
      }
    });
  };

  var onError = function () {
  };

  window.backend.getPostData(GETURL, 'GET', onSuccess, onError);

  window.validationinput.hashtagsInputHandle(hashtagsInput);
  window.validationinput.commentInputHandle(commentInput);

})();
