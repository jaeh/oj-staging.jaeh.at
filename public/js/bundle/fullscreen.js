'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the fullscreen button
 */

function addGUI() {
  var body            = document.body
    , menuContainer   = utils.getMenuContainer()
    , menuUl          = menuContainer.querySelector('ul')
    , header          = document.querySelector('header.main')
    , buttonContainer = document.createElement('li')
    , button          = document.createElement('a')
  ;
  buttonContainer.classList.add('fullscreen');
  buttonContainer.classList.add('btn-container');

  //delay to prevent animation on load
  window.setTimeout(function() {
    header.classList.add('animated');
  }, 200);

  button.className = 'btn fullscreen';
  //~ button.classList.add('icon-expand');
  //~ button.classList.add('triangle');
  //~ button.classList.add('up');
  button.innerHTML = 'zoom';
  button.addEventListener('click', utils.inPageFullscreen);
  
  buttonContainer.appendChild(button);
  menuUl.appendChild(buttonContainer);
  //~ body.insertBefore(buttonContainer, body.firstChild);
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
