'use strict';

var utils = require('./utils');
require('./fullscreen');
require('./dayNight');
require('./swipe');
require('./imageGalleryControls');

//tell the body that we have javascript support as early as possible
document.body.className = document.body.className.replace('nojs', 'js');

utils.addImageGallery();
