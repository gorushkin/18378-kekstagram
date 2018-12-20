'use strict';

(function () {
  var TIME_OUT = 10000;
  var GOOD_STATUS = 200;
  var ERROR_MESSAGE_STATUS = 'Статус ответа: ';
  var ERROR_MESSAGE_CONNECT = 'Произошла ошибка соединения';
  var ERROR_MESSAGE_TIME_OUT = 'Запрос не успел выполниться за ';
  var TIME_UNIT = 'мс';

  window.backend = {
    getPostData: function (url, method, onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open(method, url);

      xhr.addEventListener('load', function () {
        if (xhr.status === GOOD_STATUS) {
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
    }
  };
})();
