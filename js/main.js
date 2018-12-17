'use strict';

(function () {

  var ESC_KEYCODE = 27;


  var onPopupKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE
      && window.inputform.hashtagsInput !== document.activeElement.className
      && evt.target.tagName !== 'TEXTAREA') {
      window.picture.closeBigPicture();
      window.uploadpopup.closeUploadPopup();
    }
  };

  window.main = {
    onPopupKeyPress: onPopupKeyPress,
  };
})();
