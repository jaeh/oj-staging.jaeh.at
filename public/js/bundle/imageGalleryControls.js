'use strict';

var utils = require('./utils');

(function addImageGalleryControls() {
  var extraMenu       = utils.getMenuContainer()
    , buttonRightCont = document.createElement('li')
    , buttonLeftCont  = document.createElement('li')
    , buttonRight     = document.createElement('a')
    , buttonLeft      = document.createElement('a')
  ;
  buttonLeftCont.className = 'gallery-left btn-container';
  buttonRightCont.className = 'gallery-right btn-container';
  buttonRight.className = 'btn gallery-right icon-caret-right';
  buttonLeft.className = 'btn gallery-left icon-caret-left';
  buttonLeft.addEventListener('click', utils.loadPreviousImage);
  buttonRight.addEventListener('click', utils.loadNextImage);
  buttonRightCont.appendChild(buttonLeft);
  buttonLeftCont.appendChild(buttonRight);
  extraMenu.appendChild(buttonRightCont);
  extraMenu.appendChild(buttonLeftCont);

  document.addEventListener('keyup', function (evt) {
    var kC = evt.keyCode;
    if ( kC === 37 || kC === 38 ) { //left or up arrow keyboard keys
      utils.loadPreviousImage();
    } else if ( kC === 39 || kC === 40 ) { //right or down arrow 
      utils.loadNextImage();
    }
  });
})();
