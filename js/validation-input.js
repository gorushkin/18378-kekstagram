'use strict';

(function () {
  var MAX_HASHTAGS_COUNT = 5;
  var COMMENT_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_FIRST_SYMBOL = '#';
  var COMMENT_INPUT_ERROR_MESSAGE = 'Длина комментария не может составлять больше ' + COMMENT_MAX_LENGTH + ' символов';
  var HASHTAG_ERRORS_CODE = {
    noErrors: {
      errorCode: 0,
      errorText: ''
    },
    startWithHash: {
      errorCode: 1,
      errorText: 'Хэш-тег должен начинаться с символа ' + HASHTAG_FIRST_SYMBOL
    },
    wrongContent: {
      errorCode: 2,
      errorText: 'Хеш-тег не может состоять только из одной решётки'
    },
    noRepeat: {
      errorCode: 3,
      errorText: 'Один и тот же хэш-тег не может быть использован дважды'
    },
    countLimit: {
      errorCode: 4,
      errorText: 'Нельзя указать больше пяти хэш-тегов'
    },
    lengthLimit: {
      errorCode: 5,
      errorText: 'Максимальная длина одного хэш-тега ' + HASHTAG_MAX_LENGTH + ' символов, включая решётку'
    }
  };


  var checkHashTagsCollection = function (line) {
    if (line.length > MAX_HASHTAGS_COUNT) {
      return HASHTAG_ERRORS_CODE.countLimit;
    }
    for (var i = 0; i < line.length; i++) {
      for (var j = 0; j < line.length; j++) {
        if (line[i] === line[j] && i !== j) {
          return HASHTAG_ERRORS_CODE.noRepeat;
        }
      }
      if (line[i][0] !== HASHTAG_FIRST_SYMBOL) {
        return HASHTAG_ERRORS_CODE.startWithHash;
      } else if (line[i].length > HASHTAG_MAX_LENGTH) {
        return HASHTAG_ERRORS_CODE.lengthLimit;
      } else if (line[i].length === 1 && line[i][0] === HASHTAG_FIRST_SYMBOL) {
        return HASHTAG_ERRORS_CODE.wrongContent;
      }
    }
    return HASHTAG_ERRORS_CODE.noErrors;
  };

  window.validationinput = {
    hashtagsInputHandle: function (element) {
      element.addEventListener('input', function (hashtagEvt) {
        hashtagEvt.preventDefault();
        var tempAarray = element.value.toLowerCase().split(' ');
        var newArray = [];
        for (var i = 0; i < tempAarray.length; i++) {
          if (tempAarray[i].length > 0) {
            newArray.push(tempAarray[i]);
          }
        }
        element.setCustomValidity(checkHashTagsCollection(newArray).errorText);
      });
    },
    commentInputHandle: function (element) {
      element.addEventListener('input', function (commentEvt) {
        commentEvt.preventDefault();
        if (element.value.length > COMMENT_MAX_LENGTH) {
          element.setCustomValidity(COMMENT_INPUT_ERROR_MESSAGE);
        } else {
          element.setCustomValidity('');
        }
      });
    }
  };

})();
