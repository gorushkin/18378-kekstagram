'use strict';

(function () {

  window.backend = {
    load: function (url, onLoad, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', url);

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

      xhr.timeout = 10000; // 10s

      xhr.send();
    }
  };

})();
