'use strict';

var utils = {};

function getImages() {
  var gallery = document.getElementById('gallery-container')
    , images = gallery.getElementsByTagName('img')
  ;
  return images;
}

utils.log = function log() {
  var debug = false;
  if ( debug != false) {
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
}

utils.getHashId = function getHashId() {
   return parseInt(location.hash.replace('#image-', '') );
}

function countImages() {
  var images = getImages();
  return images.length;
}

utils.loadNextImage = function loadNextImage() {
  var hashId = utils.getHashId()
    , imageCount = countImages()
  ;
  utils.log('hashId', hashId, 'imageCount', imageCount);
  
  if ( hashId < imageCount ) {
    hashId += 1;
  } else {
    hashId = 1;
  }
  location.hash = '#image-' + hashId;
}

utils.loadPreviousImage = function loadPreviousImage() {
  var hashId = utils.getHashId();

  if ( hashId > 1 ) {
    hashId -= 1;
  } else {
    hashId = countImages();
  }
  location.hash = '#image-' + hashId;
}

function realFullscreen() {
  var d = document
    , elem = d.body
    , isFullscreen = d.fullscreen
                  || d.mozFullScreen
                  || d.webkitIsFullScreen
                  || d.msFullscreenElement
                  || false
  ;

  document.cancelFullscreen = d.cancelFullScreen
                           || d.exitFullscreen
                           || d.mozCancelFullScreen
                           || d.webkitCancelFullScreen
                           || d.msExitFullscreen
                           || false
  ;

  if ( ! isFullscreen ) {
    elem.requestFullscreen();
    button.classList.add('icon-compress');
    button.classList.remove('icon-expand');
  } else {
    document.cancelFullscreen();
    button.classList.add('icon-expand');
    button.classList.remove('icon-compress');
  }
}

utils.resizeImages = function resizeImages() {
  var imageGallery = document.getElementById('image-gallery');
  //make sure the gallery exists and has content
  if (imageGallery && imageGallery.innerHTML ) {
    var gallery = utils.addGallery();
    var images = gallery.getElementsByTagName('img');

    for ( var k in images ) {
      if ( images.hasOwnProperty(k) ) {
        utils.resizeImage(images[k]);
      }
    }
  }
}

/*
 * Gets the outer Height of divs, including margin
 */
function outerHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

utils.resizeImage = function resizeImage(image) {
  if ( image.style ) {
    var height          = window.innerHeight * 0.8
      , mheight         = window.innerHeight * 0.85
      , headerMain      = document.querySelector('header.main')
      , headerHeight    = outerHeight('header.main')
      , extraMenu       = document.getElementById('extra-menu-container')
      , extraMenuHeight = outerHeight('#extra-menu-container')
      , h2              = document.querySelector('#gallery-container li h2')
      , h2Height        = outerHeight('#gallery-container li h2')
      , subHeight       = window.innerHeight - headerHeight - 35
      , innerSubHeight  = subHeight - h2Height - 30
      , isLandscape     = (window.innerWidth > window.innerHeight)
      , isFullscreen    = document.body.className.indexOf('fullscreen') >= 0 
    ;

    //if is landscape mode and resolution is small
    if( isLandscape && window.innerHeight <= 350) {
      //catch portrait mode fotos and change max height for them
      subHeight = window.innerHeight - 20;
      innerSubHeight = subHeight;
    } else if ( window.innerHeight < 580 && window.innerWidth <= 350 ) {
      subHeight -= extraMenuHeight + 30;
      innerSubHeight -= extraMenuHeight + 30;
    //if is not fullscreen
    } else if ( isFullscreen ) {
      subHeight = window.innerHeight - 85;
      innerSubHeight = subHeight;
    } else {      
      subHeight -= extraMenuHeight;
      innerSubHeight -= extraMenuHeight;
    }
    image.parentNode.parentNode.style.height = subHeight + 'px';
    image.style.maxHeight = innerSubHeight + 'px';
  }
}

utils.inPageFullscreen = function inPageFullscreen(evt) {
  var cL = document.body.classList
    , cN = document.body.className
  ;
  if ( cN.indexOf('fullscreen') >= 0 ) {
    cL.remove('fullscreen');
    evt.target.innerHTML = 'expand';
  } else {
    cL.add('fullscreen');
    evt.target.innerHTML = 'menu';
  }
  //wait to allow the window to rerender
  setTimeout(utils.resizeImages, 250)

  //~ if ( evt.target ) {
    //~ var isUp = evt.target.className.indexOf('up') >= 0;
    //~ if ( isUp ) {
      //~ evt.target.classList.remove('up');
      //~ evt.target.classList.add('down');
    //~ } else {
      //~ evt.target.classList.remove('down');
      //~ evt.target.classList.add('up');
    //~ }
  //~ }
}


utils.addGallery = function addGallery() {
  if ( document.getElementById('gallery-container') ) {
    return document.getElementById('gallery-container');
  }

  var contentEle = document.getElementById('content')
    , galleryEle = document.createElement('div')
    , galleryContainerEle = document.createElement('ul')
  ;

  galleryContainerEle.id = 'gallery-container';

  galleryEle.id = 'gallery';
  galleryEle.appendChild(galleryContainerEle);

  contentEle.appendChild(galleryEle);
  return galleryContainerEle;
}

utils.getMenuContainer = function getMenuContainer() {
  var menuContainer = document.getElementById('extra-menu-container')
    , wrapper       = document.getElementById('wrapper')
  ;
  if ( ! menuContainer ) {
    menuContainer = document.createElement('div');
    var menuUl = document.createElement('ul');
    menuContainer.appendChild(menuUl);
    menuContainer.id = 'extra-menu-container';
    //~ document.body.insertBefore(menuContainer, document.body.firstChild);

    wrapper.appendChild(menuContainer);
  }
  return menuContainer;
}

utils.localStorage = function () {
  try {
      localStorage.setItem('itemtest235', 'mod');
      localStorage.removeItem('itemtest235');
      return true;
  } catch(e) {
      return false;
  }
}

utils.each = utils.forEach = function (arrOrObj, func, callback) {
  var hasCallback = ( typeof callback === 'function' );

  if ( typeof arrOrObj === 'array' ) {
    for ( var i = 0; i < arrOrObj.length; i++ ) {
      func(arrOrObj[i], i);
      if ( hasCallback && i === ( arrOrObj.length - 1 ) ) {
        callback();
      }
    }
  } else if ( typeof arrOrObj === 'object' ) {
    var numOfItems = 0
      , currentItem = 0
    for ( var cKey in arrOrObj ) {
      if ( arrOrObj.hasOwnProperty(cKey) ) {
        numOfItems++;
      }
    }
    for ( var key in arrOrObj ) {
      if ( arrOrObj.hasOwnProperty(key) ) {
        func(arrOrObj[key], key);
        if ( hasCallback && numOfItems === currentItem ) {
          callback();
        }
      }
    }
  } else {
    log.error('magic-utils', 'each called without array or object:', arrOrObj);
  }
}

utils.disableEvent = function (evt) {
  evt.preventDefault();
  return false;
}


module.exports = utils;
