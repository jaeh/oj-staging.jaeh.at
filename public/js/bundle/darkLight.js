'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the dark/light button
*/
function addGUI (isSlidePage) {
  var menuContainer    = utils.getMenuContainer()
    , menuUl           = menuContainer.querySelector('ul')
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

  if ( isSlidePage ) {
    var buttonContainer  = document.createElement('li')
      , button           = document.createElement('a')
    ;

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
  }
}


(function addDarkLightUi() {
  var contentEle  = document.getElementById('content');
  if ( contentEle ) {
    var cN          = contentEle.className
      , isSlidePage = cN.indexOf('slide') >= 0
    ;
    //only load gui on gallery page
    addGUI(isSlidePage);
  }
})();


