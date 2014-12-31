'use strict';

var utils = require('./utils');

/*
 * rendering and adds event listeners for the day/night button
*/
(function addDayNightUi () {
  var menuContainer = utils.getMenuContainer()
    , menuUl = document.getElementById('menu').getElementsByTagName('ul')[0]
    , buttonContainer = document.createElement('li')
    , button = document.createElement('a')
    , currentTimeOfDay = localStorage.bodyClass || 'day'
  ;
  buttonContainer.id = 'daynight-container';
  button.setAttribute('data-time', currentTimeOfDay);

  button.classList.add(currentTimeOfDay === 'day' ? 'day' : 'night');
  button.classList.add('icon-lamp');
  //~ button.innerHTML = currentTimeOfDay === 'day' ? 'night' : 'day';
  buttonContainer.appendChild(button);
  menuContainer.appendChild(buttonContainer);

  button.addEventListener('click', function (evt) {
    var className = button.getAttribute('data-time') || 'night'
      , newClass = 'day'
    ;

    if ( className === 'day' ) {
      newClass = 'night';
    }

    localStorage.bodyClass = newClass;
    //~ evt.target.innerHTML = evt.target.innerHTML.replace(newClass, className);
    evt.target.setAttribute('data-time', newClass);
    document.body.className = document.body.className.replace(className, newClass);
  });
})();

