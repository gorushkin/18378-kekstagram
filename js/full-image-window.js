'use strict';

(function () {
  var HIDE_CLASS = 'hidden';
  var VISUALLY_HIDDEN_CLASS = 'visually-hidden';
  var MAX_COMMENTS_COUNT = 5;

  var Selectors = {
    BIG_PICTURE: '.big-picture',
    SOCIAL_COMMENTS_LIST: '.social__comments',
    SOCIAL_COMMENT_COUNT: '.social__comment-count',
    SOCIAL_COMMENT: '.social__comment',
    SOCIAL_COMMENT_LOADER: '.social__comments-loader',
    BIG_PICTURE_CLOSE: '.big-picture__cancel',
    BIG_PICTURE_IMG: '.big-picture__img img',
    BIG_PICTURE_LIKES_COUNT: '.likes-count',
    BIG_PICTURE_SOCIAL_PICTURE: '.social__picture',
    BIG_PICTURE_COMMENTS_COUNT: '.comments-count',
    BIG_PICTURE_SOCIAL_CAPTION: '.social__caption',
    BIG_PICTURE_SOCIAL_TEXT: '.social__text',
  };

  var bigPicture = document.querySelector(Selectors.BIG_PICTURE);
  var socialCommentsList = bigPicture.querySelector(Selectors.SOCIAL_COMMENTS_LIST);
  var socialCommentCount = bigPicture.querySelector(Selectors.SOCIAL_COMMENT_COUNT);
  var socialComments = bigPicture.querySelectorAll(Selectors.SOCIAL_COMMENT);
  var commentLoader = bigPicture.querySelector(Selectors.SOCIAL_COMMENT_LOADER);
  var bigPictureClose = bigPicture.querySelector(Selectors.BIG_PICTURE_CLOSE);

  var renderBigUserPictureComments = function (comment) {
    var newElement = socialComments[0].cloneNode(true);
    newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = comment.avatar;
    newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = comment.message;
    return newElement;
  };

  window.fullimagewindows = {
    renderBigUserPicture: function (element) {
      socialCommentsList.innerHTML = '';
      bigPicture.querySelector(Selectors.BIG_PICTURE_IMG).src = element.url;
      bigPicture.querySelector(Selectors.BIG_PICTURE_LIKES_COUNT).textContent = element.likes;
      bigPicture.querySelector(Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = element.comments.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < MAX_COMMENTS_COUNT; i++) {
        fragment.appendChild(renderBigUserPictureComments(element.comments[i]));
      }
      socialCommentsList.appendChild(fragment);
      bigPicture.querySelector(Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = element.description;
    },
    openBigPicture: function () {
      bigPicture.classList.remove(HIDE_CLASS);
      document.addEventListener('keydown', window.util.onPopupKeyPress);
    },
    closeBigPicture: function () {
      bigPicture.classList.add(HIDE_CLASS);
      document.removeEventListener('keydown', window.util.onPopupKeyPress);
    }
  };

  socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);
  commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);


  bigPictureClose.addEventListener('click', window.fullimagewindows.closeBigPicture);

})();
