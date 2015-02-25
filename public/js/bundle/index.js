'use strict';
window.log = true;

import Gallery from './gallery';
import UserInterface from './userInterface';

var nEle = document.querySelector('noscript.gallery');

if ( nEle && nEle.innerHTML && typeof nEle.innerHTML === 'string' ) {
  let gallery = new Gallery(nEle)
    , ui      = new UserInterface(gallery)
  ;
}
