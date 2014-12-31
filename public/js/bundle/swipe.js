'use strict';
/*
 * phone swipe functionality
 */
(function phoneSwipe() {
  document.addEventListener('touchstart', function touchstart(evt) {
    var touches = evt.originalEvent.touches;

    if (touches && touches.length) {
      var touchStartPosition = {
          x: touches[0].pageX
        , y: touches[0].pageY
      };
      evt.preventDefault();
      document.addEventListener('touchmove', function touchmove(evt) {
        var touchEndPosition = { 
            x: touches[0].pageX 
          , y: touches[0].pageY
        };

        if ( touchEndPosition.x > touchStartPosition.x + 50 ) {
          loadNextImage();
        } else if ( touchEndPosition.x < touchStartPosition.x - 50 ) {
          loadPreviousImage();
        } else if ( touchEndPosition.y > touchStartPosition.y + 50 ) {
          loadNextImage();
        } else if ( touchEndPosition.y < touchStartPosition.y - 50 ) {
          loadPreviousImage();
        }

        evt.preventDefault();
        document.addEventListener('touchend', function touchend(evt) {
          evt.target.removeEventListener('touchmove');
          evt.preventDefault();
        } );
      });
    }
  });
});
