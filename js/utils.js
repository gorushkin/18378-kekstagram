'use strict';

(function () {
  window.util = {
    getCustomKeyHandler: function (evt, key, callback) {
      if (evt.keyCode === key) {
        callback();
      }
    }
  };
})();
