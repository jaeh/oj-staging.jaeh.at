'use strict';

var utils = require('./utils')
;

/*
 * renders the image gallery
 * 
*/
function addImageGallery() {
  var pathName = document.location.pathname
    , imageGallery = document.querySelector('noscript#gallery')
  ;
  if ( imageGallery && imageGallery.innerHTML ) {
    document.location.hash = document.location.hash || '#image-1';
    if ( utils.loadFirstImage() ) {
      utils.resizeImages();
    }
    window.addEventListener( 'resize', utils.resizeImages );
    window.addEventListener('hashchange', utils.hashChange, false);
  }
}



module.exports = addImageGallery;
