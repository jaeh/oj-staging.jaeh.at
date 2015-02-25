'use strict';

import {log, getDimensions, outerWidth, loadNextImage, loadPreviousImage} from './utils';

class ImageEvents {
  constructor(target) {
    if ( typeof target.addEventListener === 'function' ) {
      this.target = target;
      target.addEventListener('click', this.clickEvent);
      target.addEventListener('mousemove', this.mouseMoveEvent);
    }
  }

  removeEvents() {
    if ( this.target ) {
      target.removeEventListener('click', this.clickEvent);
      target.removeEventListener('mousemove', this.mouseMoveEvent);
    }
  }

  clickEvent(evt) {
    var x       = evt.x || evt.layerX
      , center  = window.innerWidth / 2
      , imageId = evt.target.id
      , clickOffsetFromCenter = window.innerWidth * .1
    ;

    log('clicked');

    if ( window.innerHeight < 400 || window.innerWidth < 400 ) {
      if ( x > center ) {
        loadNextImage();
      } else {
        loadPreviousImage();
      }
    } else {
      if ( x > center - clickOffsetFromCenter && x < center + clickOffsetFromCenter ) {
        //utils.inPageFullscreen();
      } else if ( x < center - clickOffsetFromCenter ) {
        loadPreviousImage();
      } else if ( x > window.innerWidth / 2 + clickOffsetFromCenter ) {
        loadNextImage();
      }
    }
  }

  mouseMoveEvent (mEvt) {
    var target  = mEvt.target || mEvt.srcElement
      , cursorTarget = target.parentNode.parentNode
      , imageWidth = outerWidth(cursorTarget)
      , rect    = cursorTarget.getBoundingClientRect()
      , offsetX = mEvt.clientX - rect.left
      , imageX  = ( ( imageWidth - (rect.left * 2 ) ) / 2 )
      , perc10  = window.innerWidth * .1
      , newCursor = false
    ;

    if ( offsetX > imageX - perc10 && offsetX < imageX + perc10 ) {
      if ( document.body.className.indexOf('fullscreen') > -1 ) {
        newCursor = 'url(/img/cursor-zoom-out.png), auto';
      } else {
        newCursor = 'url(/img/cursor-zoom-in.png), auto';
      }
    } else if ( offsetX > imageX ) {
      newCursor = 'url(/img/cursor-right.png), auto';
    } else {
      newCursor = 'url(/img/cursor-left.png), auto';
    }
    
    if ( newCursor && cursorTarget.style.cursor !== newCursor ) {
      cursorTarget.style.cursor = newCursor;
    }
  }
}

export default ImageEvents;

