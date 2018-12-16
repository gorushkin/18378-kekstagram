'use strict';

(function () {

  var ESC_KEYCODE = 27;


  var onPopupKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE
      && window.submitform.hashtagsInput !== document.activeElement.className
      && evt.target.tagName !== 'TEXTAREA') {
      window.picture.closeBigPicture();
      window.preview.closeUploadPopup();
    }
  };

  window.main = {
    onPopupKeyPress: onPopupKeyPress,
  };
})();
