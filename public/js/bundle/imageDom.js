'use strict';

import {outerHeight, innerHeight, innerText, getDimensions, log} from './utils';

class ImageDom {
  constructor(image) {
    var dom        = document.createElement('img');
    dom.id    = image.id;
    dom.title = image.title;
    dom.src   = this.getSrc(image.src);
    this.img  = image;
    this.dom  = dom;
  }

  getSrc(src) {
    if ( this && this.dom && this.dom.src ) { return this.dom.src; }

    var srcArray    = src.split('/')
      , imageName   = srcArray[srcArray.length - 1]
      , currentPage = location.href
    ;

    if ( this.size ) {
      srcArray[srcArray.length - 1] = this.size;
      src = srcArray.join('/') + '/' + imageName;
    }
    return src;
  }
  
  get id() {
    return this.dom.id;
  }
  get title() {
    return this.dom.title;
  }

  get size() {
    var currentPage = location.href;
    if ( currentPage.indexOf('gallery') > -1 ) {
      return 'thumb';
    } else if ( currentPage.indexOf('slide') > -1 ) {
      if ( window.innerWidth < 400 || window.innerHeight < 400 ) {
        return 'small';
      } else {
        return '';
      }
    }
  }
  
  resize() {
    var style = this.dom.style
      , galleryEle = document.querySelector('.image-gallery.single')
    ;
    if ( style && galleryEle ) {
      let w            = window
        , d            = document
        , headerHeight = outerHeight('header.main')
        , footerHeight = outerHeight('#extra-menu-container')
        , h2Height     = outerHeight('#gallery-container li h2')
        , offsetHeight = w.innerHeight * .05 + h2Height
        , height2Sub   = headerHeight + footerHeight
        , isFullscreen = ( d.body.className.indexOf('fullscreen') > -1 )
        , imageWidth   = w.innerWidth * .9
        , isLandscape  = w.innerWidth > w.innerHeight
        , imageHeight  = 0
      ;

      if ( w.innerHeight < 400 && isLandscape ) {
        imageHeight = w.innerHeight * .9;
      } else if ( isFullscreen ) {
        imageHeight -= 40;
      } else {
        if ( w.innerHeight > 400 && w.innerWidth > 400 ) {
          height2Sub += offsetHeight;
        }
        imageHeight -= height2Sub;
      }

      style.width = 'auto';
      style.height = 'auto';

      if ( w.innerHeight > 1400 || w.innerWidth > 1400 ) {
        if ( (w.innerWidth - w.innerHeight) > 300 ) {
          style.height = parseInt(imageHeight) + 'px';
        } else {
          style.width = parseInt(imageWidth) + 'px';
        }
        style.maxHeight = 'inherit';
        style.maxWidth = 'inherit';
      } else if ( w.innerHeight < 400 && isLandscape ) {
        style.maxHeight = 'inherit';
        style.maxWidth = parseInt(imageWidth) + 'px';
        style.height = parseInt(imageHeight) + 'px';
        style.width = 'auto';
      } else {
        style.maxHeight = parseInt(imageHeight) + 'px';
        style.maxWidth = parseInt(imageWidth) + 'px';
      }
    }
  }
}

export default ImageDom;
