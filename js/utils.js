'use strict';

(function () {
  window.util = {
    getRandomInteger: function (max) {
      var randomInteger = Math.floor(Math.random() * max);
      return randomInteger;
    },
    generateSubCollection: function (inputCollection, size) {
      var tempArray = inputCollection.slice();
      var subArray = [];
      for (var i = 0; i < size; i++) {
        var rnd = window.util.getRandomInteger(tempArray.length);
        var tempElement = tempArray.splice(rnd, 1);
        subArray = subArray.concat(tempElement);
      }
      return subArray;
    },
    sortCollection: function (inputCollection) {
      var newCollection = inputCollection.slice();
      newCollection.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      return newCollection;
    },
    getCustomKeyHandler: function (evt, key, callback) {
      if (evt.keyCode === key) {
        callback();
      }
    }
  };
})();
