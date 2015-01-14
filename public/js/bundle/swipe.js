'use strict';

var utils = require('./utils')
  , Hammer = require('./vendor/hammer.js')
;

/*
 * phone swipe functionality
 */
 
module.exports = function addHammer(target) {
  //~ console.log('target', target);
  var hammertime            = new Hammer(target)
    , swipeOffset           = 50
    , clickOffsetFromCenter = 30
  ;
  
  target.addEventListener('dragstart', utils.disableEvent);
  target.addEventListener('dragstop', utils.disableEvent);

  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

  hammertime.on('tap', function (evt) {
    var x = evt.center.x;

    //~ console.log('center', evt.center);
    if ( x < window.innerWidth / 2 - clickOffsetFromCenter ) {
      utils.loadPreviousImage();
    } else if ( x > window.innerWidth / 2 + clickOffsetFromCenter ) {
      utils.loadNextImage();
    }
  });
  
  hammertime.on('swipe', function (evt) {
    var deltaX = evt.deltaX
      , deltaY = evt.deltaY
    ;
    //~ console.log('delta y/x', deltaY, '/', deltaX);
    if ( deltaY > swipeOffset ) {
      //~ console.log('swipe down');
      utils.loadNextImage();
    } else if ( deltaY < - swipeOffset ) {
      //~ console.log('swipe up');
      utils.loadPreviousImage();
    }

    if ( deltaX > swipeOffset ) {
      //~ console.log('swiperight');
      utils.loadNextImage();
    } else if ( deltaX < - swipeOffset ) {
      //~ console.log('swipeleft');
      utils.loadPreviousImage();
    }
    
  });
}
