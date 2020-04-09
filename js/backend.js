'use strict';

(function () {


  var TIMEOUT = 10000;
  var OK_STATUS = 200;
  var TIME_UNIT = ' мс';

  var Errors = {
    STATUS_MESSAGE: 'Статус ответа: ',
    CONNECT_MESSAGE: 'Произошла ошибка соединения',
    TIMEOUT_MESSAGE: 'Запрос не успел выполниться за '
  };

  window.backend = {
    getPostData: function (url, method, onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open(method, url);

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS) {
          onLoad(xhr.response);
        } else {
          onError(Errors.STATUS_MESSAGE + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError(Errors.CONNECT_MESSAGE);
      });

      xhr.addEventListener('timeout', function () {
        onError(Errors.TIMEOUT_MESSAGE + xhr.timeout / 1000 + TIME_UNIT);
      });

      xhr.timeout = TIMEOUT;
      xhr.send(data);
    }
  };
})();
