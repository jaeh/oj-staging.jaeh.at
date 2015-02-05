'use strict';


function log() {
  var debug = false;
  if ( debug != false) {
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
}

function resizeImages() {
  var gallery = addGallery()
    , images = gallery.getElementsByTagName('img');

  each(images, resizeImage);
}


function inPageFullscreen(evt) {
  if ( window.innerWidth < 400 || window.innerHeight < 400 ) {
    return;
  }

  if ( document.body.className.indexOf('fullscreen') >= 0 ) {
    document.body.classList.remove('fullscreen');
    if ( evt && evt.target.innerHTML === 'menu' ) {
      evt.target.innerHTML = 'zoom';
    }
  } else {
    document.body.classList.add('fullscreen');
    if ( evt && evt.target.innerHTML === 'zoom' ) {
      evt.target.innerHTML = 'menu';
    }
  }
  resizeImages();
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

function resizeImage(image) {
  if ( image.style ) {
    var w = window
      , d = document
      , headerHeight = outerHeight('header.main')
      , footerHeight = outerHeight('#extra-menu-container')
      , h2Height     = outerHeight('#gallery-container li h2')
      , height2Sub   = headerHeight + footerHeight + h2Height
      , isFullscreen = ( d.body.className.indexOf('fullscreen') > -1 )
      , imageWidth   = w.innerWidth - 80
      , isLandscape  = w.innerWidth > w.innerHeight
      , imageHeight  = w.innerHeight
    ;

    if ( w.innerHeight < 400 && isLandscape ) {
      imageHeight = window.innerHeight - 34;
      imageWidth  = window.innerWidth * .9;
    } else if ( d.body.className.indexOf('fullscreen') === -1 ) { //not fullscreen
      imageHeight -= height2Sub + (window.innerHeight * 0.06);
    } else { //is fullscreen
      imageHeight -= 40;
    }

    image.style.width = 'auto';
    image.style.height = 'auto';

    if ( w.innerHeight > 1400 || w.innerWidth > 1400 ) {
      if ( (w.innerWidth - w.innerHeight) > 300 ) {
        image.style.height = parseInt(imageHeight) + 'px';
      } else {
        image.style.width = parseInt(imageWidth) + 'px';
      }
      image.style.maxHeight = 'inherit';
      image.style.maxWidth = 'inherit';
    } else if ( w.innerHeight < 400 && isLandscape ) {
      image.style.maxHeight = 'inherit';
      image.style.maxWidth = parseInt(imageWidth) + 'px';
      image.style.height = parseInt(imageHeight) + 'px';
      image.style.width = 'auto';
    } else {
      image.style.maxHeight = parseInt(imageHeight) + 'px';
      image.style.maxWidth = parseInt(imageWidth) + 'px';
    }
  }
}

function addGallery() {
  var galleryContainer = document.querySelector('#gallery-container');
  if ( galleryContainer ) { return galleryContainer; }

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

function getMenuContainer() {
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


function testLocalstorage () {
  try {
      localStorage.setItem('itemtest235', 'mod');
      localStorage.removeItem('itemtest235');
      return true;
  } catch(e) {
      return false;
  }
}

function each(arrOrObj, func, callback) {
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

function disableEvent (evt) {
  evt.preventDefault();
  return false;
}

 
function hashChange() {
  showImage(location.hash.replace('#image-', ''));
}

function showImage(id) {
  var image = document.getElementById('image-' + id)
    , shownImages = document.getElementsByClassName('displayed')
  ;

  if (image) {
    for ( var k in shownImages ) {
      if ( shownImages.hasOwnProperty(k) ) {
        if ( typeof shownImages[k].className !== 'undefined' ) {
          shownImages[k].className = '';
        }
      }
    }
    image.parentNode.parentNode.className = 'displayed';
  }
}

function fadeOutAndRemove(target) {
  var animDuration = 500;

  target.classList.add('fadeout');

  window.setTimeout(function () {
    target.parentNode.removeChild(target);
  }, animDuration);
}


module.exports = {
    resizeImage           : resizeImage
  , addGallery            : addGallery 
  , getMenuContainer      : getMenuContainer
  , localStorage          : testLocalstorage
  , disableEvent          : disableEvent
  , resizeImages          : resizeImages
  , log                   : log
  , hashChange            : hashChange
  , outerHeight           : outerHeight
  , outerWidth            : outerWidth
  , each                  : each
  , forEach               : each
  , fadeOutAndRemove      : fadeOutAndRemove
  , inPageFullscreen      : inPageFullscreen
};
