'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var IMG_FILTERS_BUTTON_ACTIVE = 'img-filters__button--active'

  var Selectors = {
    PICTURES_LIST: '.pictures',
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    PICTURES_LIST_ITEM: '.picture',
    IMAGE_UPLOAD_HASHTAGS: '.text__hashtags',
    IMG_UPLOAD_COMMENT: '.text__description',
    IMG_FILTERS: '.img-filters',
    IMG_FILTERS_BUTTONS: '.img-filters__button'
  };

  var GETURL = 'https://js.dump.academy/kekstagram/data';

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
  var renderPictureList = function (data) {

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

  var onSuccess = function (data) {

    renderPictureList(data);

    imageFltersContainer.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        imageFltersBottons.forEach(function (it) {
          it.classList.remove(IMG_FILTERS_BUTTON_ACTIVE);
        });
        evt.target.classList.add(IMG_FILTERS_BUTTON_ACTIVE);
        picturesContainer.innerHTML = '';
        var filterId = evt.target.id.toUpperCase().substring(evt.target.id.toUpperCase().indexOf('-') + 1);
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

  window.addEventListener('load', function () {
    imageFltersContainer.classList.remove('img-filters--inactive');
  });
})();
