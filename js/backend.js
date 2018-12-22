'use strict';

(function () {
  var TIMEOUT = 10000;
  var OK_STATUS = 200;
  var ERROR_STATUS_MESSAGE = 'Статус ответа: ';
  var ERROR_CONNECT_MESSAGE = 'Произошла ошибка соединения';
  var ERROR_TIMEOUT_MESSAGE = 'Запрос не успел выполниться за ';
  var TIME_UNIT = ' мс';

  window.backend = {
    getPostData: function (url, method, onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open(method, url);

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS) {
          onLoad(xhr.response);
        } else {
          onError(ERROR_STATUS_MESSAGE + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError(ERROR_CONNECT_MESSAGE);
      });

      xhr.addEventListener('timeout', function () {
        onError(ERROR_TIMEOUT_MESSAGE + xhr.timeout / 1000 + TIME_UNIT);
      });

      xhr.timeout = TIMEOUT;
      xhr.send(data);
    }
  };
})();
