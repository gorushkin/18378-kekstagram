'use strict';

(function () {
  var BUTTON_TAG = 'BUTTON';
  var SECTION_TAG = 'SECTION';
  var SELECTOR_MAIN = 'main';

  var main = document.querySelector(SELECTOR_MAIN);


  window.messagewindow = {
    renderMessage: function (section) {
      var closeMessage = function (element) {
        element.remove();
      };

      var element = section.cloneNode(true);
      main.appendChild(element);

      var closeMessageOnKeyPress = function () {
        closeMessage(element);
        document.removeEventListener('keydown', closeMessageOnKeyPress);
        element.removeEventListener('click', closeMessageOnBlurClick);
      };

      var closeMessageOnBlurClick = function (evt) {
        evt.preventDefault();
        if (evt.target.tagName === BUTTON_TAG
        || evt.target.tagName === SECTION_TAG) {
          closeMessage(element);
        }
      };

      document.addEventListener('keydown', closeMessageOnKeyPress);
      element.addEventListener('click', closeMessageOnBlurClick);
    }
  };
})();
