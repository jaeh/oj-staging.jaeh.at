'use strict';
//tell the body that we have javascript support as early as possible
document.body.className = document.body.className.replace('nojs', 'js');

var utils           = require('./utils')
  , addImageSingleView = require('./addImageSingleview')
  , addImageGallery = require('./addImageGallery')
  , page            = window.location.pathname
;

if ( page !== '/gallery' ) {
  window.top.scrollTo(0, 1);
}

require('./imageLoader');
//~ require('./fullscreen');
require('./darkLight');
require('./slideshow');
require('./galleryButton');
//~ require('./imageGalleryControls');

if ( page === '/gallery' ) {
  addImageGallery();
} else if ( page === '/slide' ) {
  addImageSingleView();
}

window.setTimeout(function () {
  document.body.classList.add('animated');
}, 300);
