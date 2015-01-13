'use strict';
/*
 * rendering and adds event listeners for the day/night button
*/
'use strict';

var utils = require('./utils');
(function addDayNightUi () {
  var buttonContainer  = document.createElement('li')
    , menuContainer    = utils.getMenuContainer()
    , menuUl           = menuContainer.querySelector('ul')
    , button           = document.createElement('a')
    , timeString       = 'day'
    , hours            = new Date().getHours()
    , body             = document.body
  ;
  if ( utils.localStorage() ) {
    timeString = localStorage.bodyClass;
  }

  body.classList.remove('day');
  body.classList.remove('night');
  if ( ! timeString ) {
    timeString = ( hours > 19 || hours < 7 ) ? 'night' : 'day';
  }
  body.classList.add(timeString);
  if ( utils.localStorage() ) {
    localStorage.bodyClass = timeString;
  }

  buttonContainer.classList.add('daynight');;
  buttonContainer.classList.add('btn-container');
  buttonContainer.classList.add(timeString);

  //~ button.classList.add('icon-lamp');
  button.innerHTML = timeString;
  buttonContainer.appendChild(button);
  menuUl.appendChild(buttonContainer);
  //~ body.appendChild(buttonContainer);
  //~ body.insertBefore(buttonContainer, body.firstChild);

  button.addEventListener('click', function (evt) {
    var oldClass = ( body.className.indexOf('day') >= 0 ) ? 'day' : 'night'
      , newClass = ( oldClass === 'day' ) ? 'night' : 'day'
    ;
    if ( utils.localStorage() ) {
      localStorage.bodyClass = newClass;
    }
    evt.target.innerHTML = newClass;
    body.classList.remove(oldClass);
    body.classList.add(newClass);
  });
})();

