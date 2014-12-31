'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the fullscreen button
 */
(function addFullscreenUi() {
  var menuContainer = utils.getMenuContainer()
    , elem          = document.body
    , header        = document.querySelectorAll('header.main')[0]
  ;

  elem.requestFullscreen = elem.requestFullscreen 
                        || elem.msRequestFullscreen
                        || elem.mozRequestFullScreen
                        || elem.webkitRequestFullScreen
                        || false
  ;

  var menuUl = document.getElementById('menu').getElementsByTagName('ul')[0];
  var buttonContainer = document.createElement('li');
  var button = document.createElement('a');
  buttonContainer.id = 'fullscreen-container';
  buttonContainer.appendChild(button);
  
  header.classList.add('animated');

  button.id = 'fullscreen';
  button.classList.add('icon-expand');
  //~ button.innerHTML = 'fullscreen';
  button.addEventListener('click', utils.inPageFullscreen);

  menuContainer.appendChild(buttonContainer);
  //~ menuUl.appendChild(buttonContainer);
})();
