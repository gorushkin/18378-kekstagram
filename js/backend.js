'use strict';

(function () {
  var GETURL = 'https://js.dump.academy/kekstagram/data';
  var POSTURL = 'https://js.dump.academy/kekstagram';
  var TIME_OUT = 10000;
  var GOOD_STATUS = 200;
  var ERROR_MESSAGE_STATUS = 'Статус ответа: ';
  var ERROR_MESSAGE_CONNECT = 'Произошла ошибка соединения';
  var ERROR_MESSAGE_TIME_OUT = 'Запрос не успел выполниться за ';
  var TIME_UNIT = 'мс';

  window.main = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    console.log(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === GOOD_STATUS) {
        console.log(data);
        onLoad(xhr.response);
      } else {
        onError(ERROR_MESSAGE_STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_MESSAGE_CONNECT);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERROR_MESSAGE_TIME_OUT + xhr.timeout + TIME_UNIT);
    });

    xhr.timeout = TIME_OUT;
    xhr.send(data);
  };

  window.backend = {
    newLoad: function (onLoad, onError) {
      window.main(GETURL, 'GET', onLoad, onError);
    },
    newUpLoad: function (onLoad, onError, data) {
      window.main(POSTURL, 'POST', onLoad, onError, data);
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
