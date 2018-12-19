'use strict';

(function () {
  var GETURL = 'https://js.dump.academy/kekstagram/data';
  var POSTURL = 'https://js.dump.academy/kekstagram';
  var TIME_OUT = 10000;

  window.backend = {
    load: function (onLoad, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', GETURL);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIME_OUT;

      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIME_OUT;

      xhr.open('POST', POSTURL);
      xhr.send(data);
    }
  };

})();
