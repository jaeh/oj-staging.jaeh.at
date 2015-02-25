'use strict';

import {log} from './utils';

class GalleryEvents {
  constructor(gallery) {
    this.gallery = gallery;
    this.resizeEvent();
  }
  
  resizeEvent(evt) {
    var images = this.gallery.images;
    window.addEventListener('resize', evt => {
      images.forEach((img) => {
        img.image.imageDom.resize();
      });
    });
  }
}

export default GalleryEvents;
