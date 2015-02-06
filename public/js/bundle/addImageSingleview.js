'use strict';

var utils       = require('./utils')
  , imageLoader = require('./imageLoader')
;

/*
 * renders the image gallery
 * 
*/
function addImageSingleView() {
  var pathName        = document.location.pathname
    , imageGallery    = document.querySelector('noscript#single')
    , extraMenu       = utils.getMenuContainer()
    , menuUl          = extraMenu.querySelector('ul')
    , buttonRightCont = document.createElement('li')
    , buttonLeftCont  = document.createElement('li')
    , buttonRight     = document.createElement('a')
    , buttonLeft      = document.createElement('a')
  ;
  location.hash = location.hash || '#image-1';
  if ( imageLoader.loadFirstImage() ) {
    utils.resizeImages();
  }

  buttonLeftCont.className = 'gallery-left btn-container';
  buttonRightCont.className = 'gallery-right btn-container';
  buttonRight.className = 'btn gallery-right icon-caret-right icon';
  buttonLeft.className = 'btn gallery-left icon-caret-left icon';
  buttonLeft.addEventListener('click', imageLoader.loadPreviousImage);
  buttonRight.addEventListener('click', imageLoader.loadNextImage);
  buttonRightCont.appendChild(buttonRight);
  buttonLeftCont.appendChild(buttonLeft);
  menuUl.appendChild(buttonLeftCont);
  menuUl.appendChild(buttonRightCont);
  
  window.addEventListener('resize', utils.resizeImages, false);
  window.addEventListener('hashchange', utils.hashChange, false);
  
  document.addEventListener('keyup', function (evt) {
    var keyCode = evt.keyCode
      , body    = document.body
    ;

    if ( keyCode === 37 || keyCode === 38 ) { //left or up arrow keyboard keys
      imageLoader.loadPreviousImage();
    } else if ( keyCode === 39 || keyCode === 40 ) { //right or down arrow 
      imageLoader.loadNextImage();
    } else if ( body.className.indexOf('fullscreen') > -1 ) { //is fullscreen
      if ( keyCode === 27 || keyCode === 32 ) {
        utils.inPageFullscreen();
      }
    } else { //not in fullscreen
      if ( keyCode === 32 ) {
        utils.inPageFullscreen();
      }
    }
  });
}

module.exports = addImageSingleView;
