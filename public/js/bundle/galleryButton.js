'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the dark/light button
*/
function addGUI () {
  var menuContainer    = utils.getMenuContainer()
    , menuUl           = menuContainer.querySelector('ul')
    , timeString       = 'dark'
    , timeText         = 'light'
    , hours            = new Date().getHours()
    , body             = document.body
  ;

  var buttonContainer  = document.createElement('li')
    , button           = document.createElement('a')
  ;
  button.classList.add('gallery-btn');
  button.innerHTML = 'gallery';
  button.href      = '/gallery' + location.hash;
  buttonContainer.classList.add('btn-container');
  buttonContainer.appendChild(button);
  menuUl.appendChild(buttonContainer);

}


(function addDarkLightUi() {
  var contentEle  = document.getElementById('content');
  if ( contentEle ) {
    var cN = contentEle.className;
    
    //only load gui on pages not starting with gallery
    if ( cN.indexOf('slide') > -1 ) {
      addGUI();
    }
  }
})();


