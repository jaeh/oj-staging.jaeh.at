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

function getHashId() {
   return parseInt(location.hash.replace('#image-', '') );
}

function countImages() {
  var images = getImages();
  return images.length;
}

utils.loadNextImage = function loadNextImage() {
  var hashId = getHashId()
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
  var hashId = getHashId();

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

function resizeImages() {
  var imageGallery = document.getElementById('image-gallery');
  //make sure the gallery exists and has content
  if (imageGallery && imageGallery.innerHTML ) {
    var gallery = addGallery();
    var images = gallery.getElementsByTagName('img');

    for ( var k in images ) {
      if ( images.hasOwnProperty(k) ) {
        resizeImage(images[k]);
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

function resizeImage(image) {
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
      , innerSubHeight  = subHeight - h2Height - 60
      , isLandscape     = (window.innerWidth > window.innerHeight)
      , isFullscreen    = document.body.className.indexOf('fullscreen') >= 0 
    ;

    //if is landscape mode and resolution is small
    if( isLandscape && window.innerHeight <= 350) {
      subHeight = window.innerHeight - 20;
      innerSubHeight = subHeight;
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
  setTimeout(resizeImages, 250)

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


function addGallery() {
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

function getImagesFromNoscript() {
  var imageGalleryEle = document.getElementById('image-gallery')
    , imageHTML = imageGalleryEle.innerHTML
    , imageTags = imageHTML.split('&lt;img')
    , imgs = []
  ;
  if ( imageHTML.indexOf('<img') >= 0 ) {
    imageTags = imageHTML.split('<img');
  }
  //~ utils.log('imageTags', imageTags);

  for (var i = 0; i < imageTags.length; i++ ) {
    var img = parseImgTag(imageTags[i]);
    if ( img ) {
      imgs.push( img );
    }
  }
  //~ utils.log('imgs', imgs);
  return imgs;
}

function parseImgTag(img) {
  var src = img.split('src="')[1] || ''
    , title = img.split('title="')[1] || ''
    , id = img.split('id="')[1] || ''
  ;

  //~ utils.log('img', img);

  if ( src ) {
    return {
        id    : id.split('"')[0]
      , src: src.split('"')[0]
      , title : title.split('"')[0]
    };
  }
  return false;
}

function loadImages(images) {
  images.forEach(function (image) {
    addImageEle(image);
  });
}

function loadFirstImage() {
  var hashId = getHashId()
    , images = getImagesFromNoscript()
    , image = images[hashId-1]
  ;

  if ( image ) {
    var galleryEle = addGallery();
    delete images[hashId-1];
    return addImageEle(image, true, images);
  } else {
    return false;
  }
}

function addImageEle(image, addEvent, images) {
  var imgCont    = document.createElement('li')
    , imgEleCont = document.createElement('div')
    , imgEle     = document.createElement('img')
    , imgTitle   = document.createElement('h2')
  ;

  if ( ! image ) {
    return false;
  }

  imgEle.id = image.id;
  imgEle.src = image.src;
  imgEle.title = image.title;

  imgTitle.innerHTML = image.title;
  imgEleCont.appendChild(imgEle);

  imgCont.appendChild(imgEleCont);
  imgCont.appendChild(imgTitle);

  var gallery = addGallery()
    , hashId = getHashId()
    , imgId = parseInt( imgEle.id.replace('image', '') )
  ;

  if ( imgId < hashId ) {
    var imgParent = document.getElementById('image' + hashId).parentNode.parentNode;
    gallery.insertBefore(imgCont, imgParent);
  } else {
    gallery.appendChild(imgCont);
  }

  imgEle.addEventListener('click', imageClick, false);
  resizeImage(imgEle);

  if ( addEvent && images ) {
    imgEle.addEventListener('load', function () {
      imgEle.parentNode.parentNode.className = 'displayed';
      loadImages(images);
    });
  }

  return imgCont;
}

function hashChange() {
  showImage(location.hash.replace('#image-', ''));
}

function showImage(id) {
  var image = document.getElementById('image' + id)
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

function imageClick(evt) {
  var offsetLeft = evt.target.offsetLeft;
  var x = evt.x || evt.screenX;
  var center = ( evt.target.width / 2 ) + offsetLeft;
  if ( x > center ) {
    utils.loadNextImage();
  } else {
    utils.loadPreviousImage();
  }
}

/*
 * renders the image gallery
 * 
*/
utils.addImageGallery = function addImageGallery() {
  var pathName = document.location.pathname
    , imageGallery = document.getElementById('image-gallery')
  ;
  if ( imageGallery && imageGallery.innerHTML ) {
    document.location.hash = document.location.hash || '#image-1';
    if ( loadFirstImage() ) {
      resizeImages();
    }
  }

  window.addEventListener( 'resize', resizeImages );

  document.addEventListener('webkitfullscreenchange', fullscreenChange);
  document.addEventListener('mozfullscreenchange', fullscreenChange);
  document.addEventListener('fullscreenchange', fullscreenChange);
  document.addEventListener('MSFullscreenChange', fullscreenChange);

  function fullscreenChange() {
    var d = document
      , isFullscreen = d.fullscreen
                      || d.mozFullScreen
                      || d.webkitIsFullScreen
                      || d.msFullscreenElement
                      || false
    ;

    if ( ! isFullscreen ) {
      var fullscreenEle = document.getElementById('fullscreen');
      fullscreenEle.classList.add('icon-enlarge');
      fullscreenEle.classList.remove('icon-contract');
    }
  }

  window.addEventListener('hashchange', hashChange, false);
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


module.exports = utils;
