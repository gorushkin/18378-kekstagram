'use strict';

(function () {
  var HIDE_CLASS = 'hidden';
  var VISUALLY_HIDDEN_CLASS = 'visually-hidden';
  var MAX_COMMENTS_COUNT = 5;
  var ESC_KEYCODE = 27;


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

  var renderBigUserPictureComments = function (a, b, comments) {
    socialCommentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = a; i < b; i++) {
      var newElement = socialComments[0].cloneNode(true);
      newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_PICTURE).src = comments[i].avatar;
      newElement.querySelector(Selectors.BIG_PICTURE_SOCIAL_TEXT).textContent = comments[i].message;
      fragment.appendChild(newElement);
    }
    socialCommentsList.appendChild(fragment);

  };


  var createCommentsList = function (comments) {

    var commentListStart = 0;
    var commentListFinish = MAX_COMMENTS_COUNT;
    var countClick = 1;

    var commentLoaderClick = function (evt) {
      evt.preventDefault();
      countClick = countClick + 1;
      commentListStart += MAX_COMMENTS_COUNT;
      commentListFinish = Math.min(MAX_COMMENTS_COUNT * countClick, comments.length);
      socialCommentCount.innerHTML = commentListFinish - (MAX_COMMENTS_COUNT * (countClick - 1)) + ' из <span class="comments-count">' + comments.length + '</span> комментариев';
      renderBigUserPictureComments(commentListStart, commentListFinish, comments);
      if (comments.length <= countClick * MAX_COMMENTS_COUNT) {
        commentLoader.removeEventListener('click', commentLoaderClick);
        commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);
      }
    };

    commentLoader.addEventListener('click', commentLoaderClick);
    if (comments.length <= commentListFinish) {
      commentLoader.classList.add(VISUALLY_HIDDEN_CLASS);
    } else {
      commentLoader.classList.remove(VISUALLY_HIDDEN_CLASS);
    }
    socialCommentCount.innerHTML = MAX_COMMENTS_COUNT + ' из <span class="comments-count">' + comments.length + '</span> комментариев';
    renderBigUserPictureComments(commentListStart, commentListFinish, comments);
  };

  var onPopupKeyPress = function (evt) {
    window.util.getCustomKeyHandler(evt, ESC_KEYCODE, function () {
      closeBigPicture();
    });
  };

  window.fullimagewindows = {
    renderBigUserPicture: function (element) {
      bigPicture.querySelector(Selectors.BIG_PICTURE_IMG).src = element.url;
      bigPicture.querySelector(Selectors.BIG_PICTURE_LIKES_COUNT).textContent = element.likes;
      bigPicture.querySelector(Selectors.BIG_PICTURE_COMMENTS_COUNT).textContent = element.comments.length;
      createCommentsList(element.comments);
      bigPicture.querySelector(Selectors.BIG_PICTURE_SOCIAL_CAPTION).textContent = element.description;
    },
    openBigPicture: function () {
      bigPicture.classList.remove(HIDE_CLASS);
      document.addEventListener('keydown', onPopupKeyPress);
    },
  };

  var closeBigPicture = function () {
    bigPicture.classList.add(HIDE_CLASS);
    document.removeEventListener('keydown', onPopupKeyPress);
  };

  // socialCommentCount.classList.add(VISUALLY_HIDDEN_CLASS);


  bigPictureClose.addEventListener('click', closeBigPicture);

})();
