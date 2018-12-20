'use strict';

(function () {
  var HIDE_CLASS = 'hidden';
  var DEFAULT_SCALE_CONTROL_VALUE = 100;
  var BUTTON_TAG = 'BUTTON';
  var SECTION_TAG = 'SECTION';
  var ESC_KEYCODE = 27;
  var HASHTAG_INPUT_NAME = 'hashtags';
  var DESCRIPTION_INPUT_NAME = 'description';

  var Selectors = {
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    SCALE_CONTROL_VALUE: '.scale__control--value',
    IMAGE_UPLOAD_PREVEW: '.img-upload__preview img',
    IMAGE_UPLOAD_FORM: '#upload-select-image',
    EFFECTS_PREVIEW_LIST: '.effects__list',
    SCALE_CONTROL_SMALLER: '.scale__control--smaller',
    SCALE_CONTROL_BIGGER: '.scale__control--bigger',
    IMAGE_UPLOAD_INPUT: '#upload-file',
    IMAGE_UPLOAD_POPUP_CLOSE_BUTTON: '.img-upload__cancel',
    ERROR_LOAD_TEMPLATE: '#error',
    ERROR_LOAD_WINDOW: '.error',
    ERROR_LOAD_WINDOW_CLOSE: '.error__button',
    SUCCESS_LOAD_TEMPLATE: '#success',
    SUCCESS_LOAD_WINDOW: '.success',
    SUCCESS_LOAD_WINDOW_CLOSE: '.success__button',
    MAIN: 'main'
  };

  var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
  var scaleControlValue = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_VALUE);
  var imageUploadPreview = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_PREVEW);
  var imageUploadForm = document.querySelector(Selectors.IMAGE_UPLOAD_FORM);
  var effectsPreivewList = imageUploadPopup.querySelector(Selectors.EFFECTS_PREVIEW_LIST);
  var scaleControlSmaller = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_SMALLER);
  var scaleControlBigger = imageUploadPopup.querySelector(Selectors.SCALE_CONTROL_BIGGER);
  var imageUploadInput = document.querySelector(Selectors.IMAGE_UPLOAD_INPUT);
  var imageUploadCloseButton = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_POPUP_CLOSE_BUTTON);
  var main = document.querySelector(Selectors.MAIN);

  var errorTemplate = document.querySelector(Selectors.ERROR_LOAD_TEMPLATE).content.querySelector(Selectors.ERROR_LOAD_WINDOW);
  var successTemplate = document.querySelector(Selectors.SUCCESS_LOAD_TEMPLATE).content.querySelector(Selectors.SUCCESS_LOAD_WINDOW);

  var onPopupKeyPress = function (evt) {
    window.util.getCustomKeyHandler(evt, ESC_KEYCODE, function () {
      if (evt.target.tagName !== HASHTAG_INPUT_NAME
        && evt.target.tagName !== DESCRIPTION_INPUT_NAME) {
        closeUploadPopup();
      }
    });
  };

  var openUploadPopup = function () {
    imageUploadPopup.classList.remove(HIDE_CLASS);
    document.addEventListener('keydown', onPopupKeyPress);
    scaleControlValue.value = DEFAULT_SCALE_CONTROL_VALUE;
    imageUploadPreview.style.transform = 'scale(' + DEFAULT_SCALE_CONTROL_VALUE / 100 + ')';
  };

  var closeUploadPopup = function () {
    imageUploadPopup.classList.add(HIDE_CLASS);
    document.removeEventListener('keydown', onPopupKeyPress);
    imageUploadForm.reset();
    window.previeweffects.filterReset(imageUploadPreview);
  };

  var closeMessage = function (element) {
    element.remove();
  };

  var renderMessage = function (section) {
    var element = section.cloneNode(true);
    main.appendChild(element);

    document.addEventListener('keydown', function (evt) {
      window.util.getCustomKeyHandler(evt, ESC_KEYCODE, function () {
        closeMessage(element);
      });
    });

    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.tagName === BUTTON_TAG
      || evt.target.tagName === SECTION_TAG) {
        closeMessage(element);
      }
    });

  };

  var onSuccess = function () {
    closeUploadPopup();
    renderMessage(successTemplate);
  };

  var onError = function () {
    closeUploadPopup();
    renderMessage(errorTemplate);
  };

  imageUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(imageUploadForm), onSuccess, onError);
  });

  window.previeweffects.effectsPreivewListHandle(effectsPreivewList);

  window.previeweffects.scaleControlSmallerHandle(scaleControlSmaller);

  window.previeweffects.scaleControlBiggerHandle(scaleControlBigger);

  imageUploadInput.addEventListener('change', openUploadPopup);
  imageUploadCloseButton.addEventListener('click', closeUploadPopup);
})();
