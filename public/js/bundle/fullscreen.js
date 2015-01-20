'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the fullscreen button
 */


function inPageFullscreen(evt) {
  var cL = document.body.classList
    , cN = document.body.className
  ;
  if ( cN.indexOf('fullscreen') >= 0 ) {
    cL.remove('fullscreen');
    evt.target.innerHTML = 'zoom';
  } else {
    cL.add('fullscreen');
    evt.target.innerHTML = 'menu';
  }
}

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
  button.innerHTML = 'zoom';
  button.addEventListener('click', inPageFullscreen);

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
