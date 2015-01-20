'use strict';
/*
 * rendering and adds event listeners for the dark/light button
*/
'use strict';

var utils = require('./utils');
(function addDarkLightUi () {
  var buttonContainer  = document.createElement('li')
    , menuContainer    = utils.getMenuContainer()
    , menuUl           = menuContainer.querySelector('ul')
    , button           = document.createElement('a')
    , timeString       = 'dark'
    , timeText         = 'light'
    , hours            = new Date().getHours()
    , body             = document.body
  ;
  if ( utils.localStorage() ) {
    timeString = localStorage.bodyClass;
    
  }

  body.classList.remove('dark');
  body.classList.remove('light');
  if ( ! timeString ) {
    timeString = ( hours > 19 || hours < 7 ) ? 'light' : 'dark';
  }
  
  timeText = ( timeString === 'light' ) ? 'dark' : 'light';

  body.classList.add(timeString);
  if ( utils.localStorage() ) {
    localStorage.bodyClass = timeString;
  }

  buttonContainer.classList.add('darklight');;
  buttonContainer.classList.add('btn-container');
  buttonContainer.classList.add(timeString);

  //~ button.classList.add('icon-lamp');
  button.innerHTML = timeText;
  buttonContainer.appendChild(button);
  menuUl.appendChild(buttonContainer);
  //~ body.appendChild(buttonContainer);
  //~ body.insertBefore(buttonContainer, body.firstChild);

  button.addEventListener('click', function (evt) {
    var oldClass = ( body.className.indexOf('dark') >= 0 ) ? 'dark' : 'light'
      , newClass = ( oldClass === 'dark' ) ? 'light' : 'dark'
    ;
    if ( utils.localStorage() ) {
      localStorage.bodyClass = newClass;
    }
    evt.target.innerHTML = oldClass;
    body.classList.remove(oldClass);
    body.classList.add(newClass);
  });
})();

