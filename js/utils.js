'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var HASHTAG_INPUT_NAME = 'hashtags';
  var DESCRIPTION_INPUT_NAME = 'description';

  window.util = {
    getRandomInteger: function (min, max) {
      var randomInteger = Math.floor(Math.random() * (max - min) + min);
      return randomInteger;
    },
    generateSubCollection: function (inputCollection, size) {
      var tempArray = inputCollection.slice();
      var subArray = [];
      for (var i = 0; i < size; i++) {
        var rnd = window.util.getRandomInteger(0, tempArray.length);
        var tempElement = tempArray.splice(rnd, 1);
        subArray = subArray.concat(tempElement);
      }
      return subArray;
    },
    onPopupKeyPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE
        && evt.target.tagName !== HASHTAG_INPUT_NAME
        && evt.target.tagName !== DESCRIPTION_INPUT_NAME) {
        window.fullimagewindows.closeBigPicture();
        window.editorwindow.closeUploadPopup();
      }
    }
  };
})();
