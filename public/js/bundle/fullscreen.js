'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the fullscreen button
 */


function addGUI() {
  var menuContainer   = utils.getMenuContainer()
    , menuUl          = menuContainer.querySelector('ul')
    , header          = document.querySelector('header.main')
    , buttonContainer = document.createElement('li')
    , button          = document.createElement('a')
  ;
  buttonContainer.classList.add('fullscreen');
  buttonContainer.classList.add('btn-container');

  button.className = 'btn fullscreen';
  button.innerHTML = 'zoom';
  button.addEventListener('click', utils.inPageFullscreen);

  buttonContainer.appendChild(button);
  menuUl.appendChild(buttonContainer);
}

(function addFullscreenUi() {
  var contentEle  = document.getElementById('content');
  if ( contentEle ) {
    var cN = contentEle.className;
    //only load gui on gallery page
    if ( cN.indexOf('gallery') >= 0 ) {
      addGUI();
    }
  }
})();
