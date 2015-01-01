'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the fullscreen button
 */
(function addFullscreenUi() {
  var contentEle  = document.getElementById('content');

  function addGUI() {
    var menuContainer = utils.getMenuContainer()
      , elem          = document.body
      , header        = document.querySelectorAll('header.main')[0]
      , menuUl = document.getElementById('menu').getElementsByTagName('ul')[0]
      , buttonContainer = document.createElement('li')
      , button = document.createElement('a')
    ;
    buttonContainer.id = 'fullscreen-container';
    buttonContainer.appendChild(button);

    header.classList.add('animated');

    button.id = 'fullscreen';
    button.classList.add('icon-expand');
    //~ button.innerHTML = 'fullscreen';
    button.addEventListener('click', utils.inPageFullscreen);
    
    menuContainer.appendChild(buttonContainer);
  }

  if ( contentEle ) {
    var cN = contentEle.className;
    if ( cN.indexOf('work') >= 0 || cN.indexOf('index') >= 0 ) {
      addGUI();
    }
  }
})();
