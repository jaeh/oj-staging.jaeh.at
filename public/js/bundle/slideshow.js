'use strict';

var utils    = require('./utils')
  , interval = false
;

/*
 * rendering and adds event listeners for the fullscreen button
 */

function slideshow() {
  var isRunning = (document.body.className.indexOf('slideshow') >= 0);

  if ( isRunning ) {
    console.log('stopslideshow');
    document.body.classList.remove('slideshow');
    console.log(interval);
    clearInterval(interval);
  } else {
    console.log('startSlideShow');
    interval = setInterval(utils.loadNextImage, 3000);
    document.body.classList.add('slideshow');
  }
}
function addGUI() {
  var d               = document
    , menuContainer   = utils.getMenuContainer()
    , menuUl          = menuContainer.querySelector('ul')
    , buttonContainer = d.createElement('li')
    , button          = d.createElement('a')
  ;
  buttonContainer.classList.add('slideshow');
  buttonContainer.classList.add('btn-container');

  button.className = 'btn slideshow';
  button.innerHTML = 'slideshow';
  button.addEventListener('click', slideshow);

  buttonContainer.appendChild(button);
  menuUl.appendChild(buttonContainer);
}

(function addFullscreenUi() {
  var contentEle  = document.getElementById('content');
  if ( contentEle ) {
    var cN = contentEle.className;
    //only load gui on work/index page
    if ( cN.indexOf('work') >= 0 || cN.indexOf('index') >= 0) {
      addGUI();
    }
  }
})();
