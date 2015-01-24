'use strict';

var utils       = require('./utils')
  , imageLoader = require('./imageLoader')
;

/*
 * renders the image gallery
 * 
*/
function addImageGallery() {
  var pathName = document.location.pathname
    , imageGallery = document.querySelector('noscript#single')
  ;
  if ( imageGallery && imageGallery.innerHTML ) {
    document.location.hash = document.location.hash || '#image-1';
    if ( imageLoader.loadFirstImage() ) {
      utils.resizeImages();
    }
    window.addEventListener( 'resize', utils.resizeImages );
    window.addEventListener('hashchange', utils.hashChange, false);
  }
}

module.exports = addImageGallery;
