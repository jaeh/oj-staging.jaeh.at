'use strict';

var utils = require('./utils')
  , addImageGallery = require('./addImageGallery')
;

require('./fullscreen');
require('./darkLight');
require('./imageGalleryControls');

//tell the body that we have javascript support as early as possible
document.body.className = document.body.className.replace('nojs', 'js');

addImageGallery();
