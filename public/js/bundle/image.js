'use strict';

import {outerHeight, innerHeight, innerText, getDimensions, log} from './utils';
import ImageDom from './imageDom';


class Image {
  constructor(image, key, single = false) {
    this.nEle     = document.querySelector('noscript.gallery');
    this.li       = document.createElement('li');
    this.imageDom = new ImageDom(image);
    this.img      = this.imageDom.dom;

    if ( ! this.isSingle ) { //gallery, add links
      this.href = document.createElement('a');
      this.href.href = '/slide#' + image.id
      this.href.appendChild(this.img);
      this.li.appendChild(this.href);

    } else { //single image page
      this.imageDom.resize();
      this.li.appendChild(this.img);
      this.footer = document.createElement('footer');
      innerText(this.footer, image.title);
      this.li.appendChild(this.footer);
    }

    if ( image.hasOwnProperty('first') ) {
      this.li.classList.add('active');
    }
  }

  get isSingle() {
    return this.nEle.className.indexOf('single') > -1;
  }

  get maxSize() {
    var menuDims      = getDimensions(document.querySelector('header.main'))
      , footerDims    = getDimensions(document.querySelector('footer.main'))
      , imgFooterDims = getDimensions(document.querySelector('.image-gallery li footer'))
      , subHeight     = menuDims.height - footerDims.height - imgFooterDims.height
      , subWidth      = menuDims.width - footerDims.width - imgFooterDims.width
      , max           = {
          height: parseInt(window.innerHeight - subHeight)
        , width : parseInt(window.innerWidth * .9)
      }
    ;
    return max;
  }

  appendTo(ele) {
    if ( typeof ele.appendChild === 'function' ) {
      ele.appendChild(this.li);
    }
  }
}

export default Image;
