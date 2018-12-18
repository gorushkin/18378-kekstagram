'use strict';
(function () {
  var HIDE_CLASS = 'hidden';
  var DEFAULT_SCALE_CONTROL_VALUE = 100;

  var Selectors = {
    IMAGE_UPLOAD_POPUP: '.img-upload__overlay',
    SCALE_CONTROL_VALUE: '.scale__control--value',
    IMAGE_UPLOAD_PREVEW: '.img-upload__preview img',
    IMAGE_UPLOAD_FORM: '#upload-select-image',
    EFFECTS_PREVIEW_LIST: '.effects__list',
    SCALE_CONTROL_SMALLER: '.scale__control--smaller',
    SCALE_CONTROL_BIGGER: '.scale__control--bigger',
    IMAGE_UPLOAD_INPUT: '#upload-file',
    IMAGE_UPLOAD_POPUP_CLOSE_BUTTON: '.img-upload__cancel'
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


  var openUploadPopup = function () {
    imageUploadPopup.classList.remove(HIDE_CLASS);
    document.addEventListener('keydown', window.util.onPopupKeyPress);
    scaleControlValue.value = DEFAULT_SCALE_CONTROL_VALUE;
    imageUploadPreview.style.transform = 'scale(' + DEFAULT_SCALE_CONTROL_VALUE / 100 + ')';
  };

  window.editorwindow = {
    closeUploadPopup: function () {
      imageUploadPopup.classList.add(HIDE_CLASS);
      document.removeEventListener('keydown', window.util.onPopupKeyPress);
      imageUploadForm.reset();
      window.previeweffects.filterReset(imageUploadPreview);
    }
  };

  window.previeweffects.effectsPreivewListHandle(effectsPreivewList);

  window.previeweffects.scaleControlSmallerHandle(scaleControlSmaller);

  window.previeweffects.scaleControlBiggerHandle(scaleControlBigger);

  imageUploadInput.addEventListener('change', openUploadPopup);
  imageUploadCloseButton.addEventListener('click', window.editorwindow.closeUploadPopup);
})();
