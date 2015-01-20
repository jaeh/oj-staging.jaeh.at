'use strict';
//tell the body that we have javascript support as early as possible
document.body.className = document.body.className.replace('nojs', 'js');

var utils = require('./utils')
  , addImageGallery = require('./addImageGallery')
;

require('./fullscreen');
require('./darkLight');
require('./slideshow');
require('./imageGalleryControls');

addImageGallery();
//~ require('./centerVertically');
