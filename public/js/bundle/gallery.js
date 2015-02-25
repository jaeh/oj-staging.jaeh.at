'use strict';

import {log, each} from './utils';
import Image from './image';
import parse from './noscriptParser';
import ImageEvents from './imageEvents';

import GalleryEvents from './galleryEvents';

class Gallery {
  constructor(nEle) {
    if ( nEle && nEle.innerHTML ) {
      var htmlParent  = document.createElement('div')
        , parsedImgs  = parse(nEle.innerHTML)
        , images      = this.findFirstImage(parsedImgs)
      ;
      this.images = images;
      this.append();
    }
    
    new GalleryEvents(this);
  }

  findFirstImage(images) {
    var imageFound  = false
      , currentHash = location.hash.replace('#', '')
    ;

    images.forEach((image, key) => {
      if ( ! imageFound ) {
        image.key = key;

        if ( image.id === currentHash ) {
          image.first = true;
          imageFound = true;
        }
      }
    });
    if ( ! imageFound ) { 
      images[0].key = 0;
      images[0].first = true;
    }
    return images;
  }

  append() {
    var contentEle = document.querySelector('#content')
      , galleryEle = document.createElement('div')
      , galleryUl  = document.createElement('ul')
      , nEle       = document.querySelector('noscript.gallery')
      , isSingle   = ( nEle.className.indexOf('single') > -1 )
    ;

    galleryEle.className = 'image-gallery';

    if ( isSingle ) { 
      galleryEle.classList.add('single');
    } else {
      galleryEle.classList.add('multi');
    }

    this.images.forEach((img, key) => {
      var image = new Image(img, key, isSingle);
      img.image = image;
      image.appendTo(galleryUl);
      new ImageEvents(image.li);
    });

    galleryEle.appendChild(galleryUl);

    contentEle.appendChild(galleryEle);
  }
}

export default Gallery;
