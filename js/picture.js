'use strict';

(function () {

  var HIDE_CLASS = 'hidden';
  var VISUALLY_HIDDEN_CLASS = 'visually-hidden';


  var Selectors = {
    SOCIAL_COMMENT_COUNT: '.social__comment-count',
    SOCIAL_COMMENT: '.social__comment',
    SOCIAL_COMMENTS_LIST: '.social__comments',
    SOCIAL_COMMENT_LOADER: '.social__comments-loader',
    BIG_PICTURE_SOCIAL_PICTURE: '.social__picture',
    BIG_PICTURE_SOCIAL_TEXT: '.social__text',
    BIG_PICTURE_LIKES_COUNT: '.likes-count',
    PICTURES_LIST_ITEM: '.picture',
    BIG_PICTURE_CLOSE: '.big-picture__cancel',
    BIG_PICTURE_SOCIAL_CAPTION: '.social__caption',
    BIG_PICTURE_COMMENTS_COUNT: '.comments-count',
    BIG_PICTURE: '.big-picture',
    BIG_PICTURE_IMG: '.big-picture__img img'
  };


  var bigPicure = document.querySelector(Selectors.BIG_PICTURE);
  var socialComments = bigPicure.querySelectorAll(Selectors.SOCIAL_COMMENT);
  var socialCommentsList = bigPicure.querySelector(Selectors.SOCIAL_COMMENTS_LIST);
  var bigPictureClose = bigPicure.querySelector(Selectors.BIG_PICTURE_CLOSE);
  var socialCommentCount = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_COUNT);
  var commentLoader = bigPicure.querySelector(Selectors.SOCIAL_COMMENT_LOADER);


  var renderBigUserPictureComments = function (n, picture) {
    var newElement = socialComments[0].cloneNode(true);
    newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = 'img/avatar-' + window.data.getRandomInteger(1, 7).toString() + '.svg';
    newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = picture.comments[n];
    return newElement;
  };

  var fragment;

  var renderBigUserPicture = function (picture) {
    socialCommentsList.innerHTML = '';
    bigPicure.querySelector(Selectors.BIG_PICTURE_IMG).src = picture.url;
    bigPicure.querySelector(Selectors.BIG_PICTURE_LIKES_COUNT).textContent = picture.likes;
    bigPicure.querySelector(Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = picture.comments.length;
    fragment = document.createDocumentFragment();
    for (var i = 0; i < picture.comments.length; i++) {
      fragment.appendChild(renderBigUserPictureComments(i, picture));
    }
    socialCommentsList.appendChild(fragment);
    bigPicure.querySelector(Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = picture.description;
  };

  var openBigPicture = function () {
    bigPicure.classList.remove(HIDE_CLASS);
    document.addEventListener('keydown', window.main.onPopupKeyPress);
  };

  var closeBigPicture = function () {
    bigPicure.classList.add(HIDE_CLASS);
    document.removeEventListener('keydown', window.main.onPopupKeyPress);
  };

  var picturesList = window.gallery.picturesContainer.querySelectorAll(Selectors.PICTURES_LIST_ITEM);

  var openThumbnailImage = function (n) {
    picturesList[n].addEventListener('click', function () {
      renderBigUserPicture(window.data.photosInfoList[n]);
      openBigPicture();
    });
  };

  for (var i = 0; i < picturesList.length; i++) {
    openThumbnailImage(i);
  }

  bigPictureClose.addEventListener('click', closeBigPicture);

  socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);
  commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);
  window.picture = {
    closeBigPicture: closeBigPicture
  };
})();
