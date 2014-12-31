'use strict';

var utils = require('./utils');

(function addImageGalleryControls() {
  var menuUl = document.getElementById('menu').getElementsByTagName('ul')[0]
    , buttonContainer = document.createElement('li')
    , buttonRight = document.createElement('a')
    , buttonLeft = document.createElement('a')
  ;
  buttonContainer.id = 'leftright-container';
  buttonRight.id = 'btn-right';
  buttonRight.classList.add('icon-caret-right');
  buttonLeft.id = 'btn-left';
  buttonLeft.classList.add('icon-caret-left');
  buttonContainer.appendChild(buttonLeft);
  buttonContainer.appendChild(buttonRight);
  menuUl.appendChild(buttonContainer);

  buttonLeft.addEventListener('click', loadPreviousImage);
  buttonRight.addEventListener('click', loadNextImage);

  document.addEventListener('keyup', function (evt) {
    var kC = evt.keyCode;
    if ( kC === 37 || kC === 38 ) {
      utils.loadPreviousImage();
    } else if ( kC === 39 || kC === 40 ) {
      utils.loadNextImage();
    }
  });
})();
