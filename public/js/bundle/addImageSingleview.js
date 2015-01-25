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
  location.hash = location.hash || '#image-1';
  if ( imageLoader.loadFirstImage() ) {
    utils.resizeImages();
  }
  window.addEventListener('resize', utils.resizeImages, false);
  window.addEventListener('hashchange', utils.hashChange, false);
}

module.exports = addImageSingleView;
