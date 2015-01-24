'use strict';

var utils       = require('./utils')
  , imageLoader = require('./imageLoader')
;

/*
 * renders the image gallery
 * 
*/
function addImageSingleView() {
  var pathName = document.location.pathname
    , imageGallery = document.querySelector('noscript#single')
  ;
  document.location.hash = document.location.hash || '#image-1';
  if ( imageLoader.loadFirstImage() ) {
    utils.resizeImages();
  }
  console.log('addEventListener');
  window.addEventListener('resize', function () {
    console.log('resizeimages');
    utils.resizeImages();
  } );
  window.addEventListener('hashchange', utils.hashChange, false);
}

module.exports = addImageSingleView;
