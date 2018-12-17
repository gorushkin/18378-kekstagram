'use strict';

(function () {

  var HIDE_CLASS = 'hidden';
  var DEFAULT_SCALE_CONTROL_VALUE = 100;


  var Selectors = {
    IMAGE_UPLOAD_FORM: '#upload-select-image',
    IMAGE_UPLOAD_POPUP_CLOSE_BUTTON: '.img-upload__cancel',
    IMAGE_UPLOAD_INPUT: '#upload-file',
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    IMAGE_UPLOAD_PREVEW: '.img-upload__preview img',
  };

  var imageUploadPopup = document.querySelector(Selectors.IMAGE_UPLOAD_POPUP);
  var imageUploadPreview = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_PREVEW);
  var imageUploadForm = document.querySelector(Selectors.IMAGE_UPLOAD_FORM);
  var imageUploadInput = document.querySelector(Selectors.IMAGE_UPLOAD_INPUT);
  var imageUploadCloseButton = imageUploadPopup.querySelector(Selectors.IMAGE_UPLOAD_POPUP_CLOSE_BUTTON);

  var openUploadPopup = function () {
    imageUploadPopup.classList.remove(HIDE_CLASS);
    document.addEventListener('keydown', window.main.onPopupKeyPress);
    window.preview.scaleControlValue.value = DEFAULT_SCALE_CONTROL_VALUE;
    imageUploadPreview.style.transform = 'scale(' + DEFAULT_SCALE_CONTROL_VALUE / 100 + ')';
  };

  var closeUploadPopup = function () {
    imageUploadPopup.classList.add(HIDE_CLASS);
    document.removeEventListener('keydown', window.main.onPopupKeyPress);
    imageUploadForm.reset();
    imageUploadPreview.style.filter = window.preview.Filters.NONE;

  };

  imageUploadInput.addEventListener('change', openUploadPopup);
  imageUploadCloseButton.addEventListener('click', closeUploadPopup);

  window.uploadpopup = {
    imageUploadPopup: imageUploadPopup,
    imageUploadPreview: imageUploadPreview,
    closeUploadPopup: closeUploadPopup
  };

})();
