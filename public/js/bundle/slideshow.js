'use strict';

var utils    = require('./utils')
  , interval = false
;

/*
 * rendering and adds event listeners for the slideshow button
 */

function slideshow(evt) {
  var isRunning = (document.body.className.indexOf('slideshow') >= 0)
    , target    = evt.target
  ;

  if ( isRunning ) {
    document.body.classList.remove('slideshow');
    target.innerHTML = 'slide';
    clearInterval(interval);
  } else {
    interval = setInterval(utils.loadNextImage, 3000);
    target.innerHTML = 'stop';
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
  button.innerHTML = 'slide';
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
