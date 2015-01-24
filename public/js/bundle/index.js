'use strict';
//tell the body that we have javascript support as early as possible
document.body.className = document.body.className.replace('nojs', 'js');

var utils           = require('./utils')
  , addImageSingleView = require('./addImageSingleview')
  //~ , addImageGallery = require('./addImageGallery')
  , page            = window.location.pathname
;

require('./imageLoader');
require('./fullscreen');
require('./darkLight');
require('./slideshow');
require('./imageGalleryControls');

//~ if ( pathname === '/gallery' ) {
  //~ addImageGallery();
//~ } else if ( pathname === '/' || pathname === '' ) {
  addImageSingleView();
//~ }
