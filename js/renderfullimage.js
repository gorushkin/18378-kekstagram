'use strict';

(function () {
  var HIDE_CLASS = 'hidden';
  var VISUALLY_HIDDEN_CLASS = 'visually-hidden';

  var bigPicure = document.querySelector(window.data.Selectors.BIG_PICTURE);
  var socialCommentsList = bigPicure.querySelector(window.data.Selectors.SOCIAL_COMMENTS_LIST);
  var socialCommentCount = bigPicure.querySelector(window.data.Selectors.SOCIAL_COMMENT_COUNT);
  var socialComments = bigPicure.querySelectorAll(window.data.Selectors.SOCIAL_COMMENT);
  var commentLoader = bigPicure.querySelector(window.data.Selectors.SOCIAL_COMMENT_LOADER);
  var bigPictureClose = bigPicure.querySelector(window.data.Selectors.BIG_PICTURE_CLOSE);

  var renderBigUserPictureComments = function (n, picture) {
    var newElement = socialComments[0].cloneNode(true);
    newElement.querySelector(window.data.Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = 'img/avatar-' + window.data.getRandomInteger(1, 7).toString() + '.svg';
    newElement.querySelector(window.data.Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = picture.comments[n];
    return newElement;
  };

  window.renderBigUserPicture = function (picture) {
    socialCommentsList.innerHTML = '';
    bigPicure.querySelector(window.data.Selectors.BIG_PICTURE_IMG).src = picture.url;
    bigPicure.querySelector(window.data.Selectors.BIG_PICTURE_LIKES_COUNT).textContent = picture.likes;
    bigPicure.querySelector(window.data.Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = picture.comments.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picture.comments.length; i++) {
      fragment.appendChild(renderBigUserPictureComments(i, picture));
    }
    socialCommentsList.appendChild(fragment);
    bigPicure.querySelector(window.data.Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = picture.description;
  };

  socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);
  commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);

  window.openBigPicture = function () {
    bigPicure.classList.remove(HIDE_CLASS);
    document.addEventListener('keydown', window.onPopupKeyPress);
  };

  var closeBigPicture = function () {
    bigPicure.classList.add(HIDE_CLASS);
    document.removeEventListener('keydown', window.onPopupKeyPress);
  };

  bigPictureClose.addEventListener('click', closeBigPicture);

})();
