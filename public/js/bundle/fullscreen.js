'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the fullscreen button
 */
(function addFullscreenUi() {
  var contentEle  = document.getElementById('content');

  function addGUI() {
    var body            = document.body
      //~ , menuContainer   = utils.getMenuContainer()
      , header          = document.querySelector('header.main')
      , menuUl          = document.querySelector('menu ul')
      , buttonContainer = document.createElement('div')
      , button          = document.createElement('a')
    ;
    buttonContainer.id = 'fullscreen-container';
    buttonContainer.appendChild(button);

    header.classList.add('animated');

    button.id = 'fullscreen';
    //~ button.classList.add('icon-expand');
    button.classList.add('triangle');
    button.classList.add('up');
    //~ button.innerHTML = 'fullscreen';
    button.addEventListener('click', utils.inPageFullscreen);
    
    //~ menuContainer.appendChild(buttonContainer);
    body.appendChild(buttonContainer);
  }

  if ( contentEle ) {
    var cN = contentEle.className;
    if ( cN.indexOf('work') >= 0 || cN.indexOf('index') >= 0 ) {
      addGUI();
    }
  }
})();
