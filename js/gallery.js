'use strict';

(function () {
  var PHOTOS_COUNT = 25;

  var Selectors = {
    PICTURE_TEMPLATE: '#picture',
    PICTURE_TEMPLATE_IMG: '.picture__img',
    PICTURE_TEMPLATE_LIKES: '.picture__likes',
    PICTURE_TEMPLATE_COMMENTS: '.picture__comments',
    USER_PICTURE: '.picture',
    PICTURES_LIST: '.pictures'
  };

  var pictureTemplate =
  document.querySelector(Selectors.PICTURE_TEMPLATE).content.querySelector(Selectors.USER_PICTURE);
  var picturesContainer = document.querySelector(Selectors.PICTURES_LIST);


  var renderUserPicture = function (photoInfo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector(Selectors.PICTURE_TEMPLATE_IMG).src = photoInfo.url;
    photoElement.querySelector(Selectors.PICTURE_TEMPLATE_LIKES).textContent = photoInfo.likes;
    photoElement.querySelector(Selectors.PICTURE_TEMPLATE_COMMENTS).textContent = photoInfo.comments.length;
    return photoElement;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    window.data.photosInfoList.push(window.data.createPhotoInfo(i + 1));
    fragment.appendChild(renderUserPicture(window.data.photosInfoList[i]));
  }

  picturesContainer.appendChild(fragment);

  window.gallery = {
    picturesContainer: picturesContainer
  };
})();
