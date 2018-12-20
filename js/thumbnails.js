'use strict';

(function () {
  var Selectors = {
    PICTURE_TEMPLATE: '#picture',
    USER_PICTURE: '.picture',
    PICTURE_TEMPLATE_IMG: '.picture__img',
    PICTURE_TEMPLATE_LIKES: '.picture__likes',
    PICTURE_TEMPLATE_COMMENTS: '.picture__comments'
  };

  var pictureTemplate = document.querySelector(Selectors.PICTURE_TEMPLATE).content.querySelector(Selectors.USER_PICTURE);

  window.thumbnails = {
    renderUserPicture: function (photoInfo) {
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector(Selectors.PICTURE_TEMPLATE_IMG).src = photoInfo.url;
      photoElement.querySelector(Selectors.PICTURE_TEMPLATE_LIKES).textContent = photoInfo.likes;
      photoElement.querySelector(Selectors.PICTURE_TEMPLATE_COMMENTS).textContent = photoInfo.comments.length;
      return photoElement;
    }
  };

})();
