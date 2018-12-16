'use strict';

(function () {

  var ESC_KEYCODE = 27;


  var onPopupKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE
      && evt.target.tagName !== 'INPUT'
      && evt.target.tagName !== 'TEXTAREA') {
      window.picture.closeBigPicture();
      // closeUploadPopup();
    }
  };

  window.main = {
    onPopupKeyPress: onPopupKeyPress,
  };
})();
