'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var HASHTAG_INPUT_NAME = 'hashtags';
  var DESCRIPTION_INPUT_NAME = 'description';

  window.util = {
    onPopupKeyPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE
        && evt.target.tagName !== HASHTAG_INPUT_NAME
        && evt.target.tagName !== DESCRIPTION_INPUT_NAME) {
        window.fullimagewindows.closeBigPicture();
        window.editorwindow.closeUploadPopup();
      }
    },
    onPopupKeyPressNew: function (evt, key, callback) {
      if (evt.keyCode === key) {
        callback();
      }
    }
  };
})();
