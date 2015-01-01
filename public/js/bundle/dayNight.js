'use strict';
/*
 * rendering and adds event listeners for the day/night button
*/
'use strict';

var utils = require('./utils');
(function addDayNightUi () {
  var menuContainer    = utils.getMenuContainer()
    , buttonContainer  = document.createElement('li')
    , button           = document.createElement('a')
    , timeString       = localStorage.bodyClass
    , hours            = new Date().getHours()
    , body             = document.body
  ;
  body.classList.remove('day');
  body.classList.remove('night');
  if ( ! timeString ) {
    timeString = ( hours > 19 || hours < 7 ) ? 'night' : 'day';
  }
  body.classList.add(timeString);
  localStorage.bodyClass = timeString;

  buttonContainer.id = 'daynight-container';

  button.classList.add(timeString);
  button.classList.add('icon-lamp');
  //~ button.innerHTML = timeString;
  buttonContainer.appendChild(button);
  menuContainer.appendChild(buttonContainer);

  button.addEventListener('click', function (evt) {
    var oldClass = ( body.className.indexOf('day') >= 0 ) ? 'day' : 'night'
      , newClass = ( oldClass === 'day' ) ? 'night' : 'day'
    ;
    localStorage.bodyClass = newClass;
    //~ evt.target.innerHTML = newClass;
    body.classList.remove(oldClass);
    body.classList.add(newClass);
  });
})();

