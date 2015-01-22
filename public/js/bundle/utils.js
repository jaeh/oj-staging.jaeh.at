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

    if ( window.innerWidth > 1400 || window.innerHeight > 1400 ) {
      document.body.classList.add('zoomed');
    }

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

  if ( ! el ) {
    return false;
  }
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

/*
 * Gets the outer Height of divs, including margin
 */
function outerWidth(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  if ( ! el ) {
    return false;
  }
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginLeft']) +
               parseFloat(styles['marginRight']);

  return Math.ceil(el.offsetWidth + margin);
}

utils.resizeImage = function (image) {
  if ( image.style ) {
    var w = window
      , d = document
      , headerHeight = outerHeight('header.main')
      , footerHeight = outerHeight('#extra-menu-container')
      , h2Height     = outerHeight('#gallery-container li h2')
      , height2Sub   = headerHeight + footerHeight + h2Height
      , isFullscreen = ( d.body.className.indexOf('fullscreen') > -1 )
      , imageWidth   = w.innerWidth * 0.9
      , isLandscape  = w.innerWidth > w.innerHeight
      , imageHeight  = w.innerHeight
    ;
    
    if ( d.body.className.indexOf('fullscreen') === -1 ) {
      //~ console.log('is not fullscreen');
      imageHeight -= height2Sub;
    } else {
      //only footer is shown in fullscreen
      imageHeight -= footerHeight;
    }

    if ( w.innerHeight > 1400 ) {
      if ( isLandscape ) {
        image.style.height = imageHeight + 'px';
      } else {
        image.style.height = 'auto';
      }
    } else {
      image.style.maxHeight = imageHeight + 'px';
      image.style.height = 'auto';
    }
    if ( w.innerWidth > 1400 ) {
      if ( ! isLandscape ) {
        image.style.width = imageWidth + 'px';
      } else {
        image.style.width = 'auto';
      }
    } else {
      image.style.maxWidth = imageWidth + 'px';
      image.style.width = 'auto';
    }
  }
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


utils.outerHeight = outerHeight;
utils.outerWidth = outerWidth;
module.exports = utils;
