'use strict';

var utils = require('./utils')
  , swipe = require('./swipe')
;

/*
 * renders the image gallery
 * 
*/
function addImageGallery() {
  var pathName = document.location.pathname
    , imageGallery = document.getElementById('image-gallery')
  ;
  if ( imageGallery && imageGallery.innerHTML ) {
    document.location.hash = document.location.hash || '#image-1';
    if ( loadFirstImage() ) {
      utils.resizeImages();
    }
  }

  window.addEventListener( 'resize', utils.resizeImages );

  document.addEventListener('webkitfullscreenchange', fullscreenChange);
  document.addEventListener('mozfullscreenchange', fullscreenChange);
  document.addEventListener('fullscreenchange', fullscreenChange);
  document.addEventListener('MSFullscreenChange', fullscreenChange);

  window.addEventListener('hashchange', hashChange, false);
}


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

function loadImages(images) {
  images.forEach(function (image) {
    addImageEle(image);
  });
}

function loadFirstImage() {
  var hashId = utils.getHashId()
    , images = getImagesFromNoscript()
    , image = images[hashId-1]
  ;

  if ( image ) {
    var galleryEle = utils.addGallery();
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
  swipe(imgCont);

  var gallery = utils.addGallery()
    , hashId = utils.getHashId()
    , imgId = parseInt( imgEle.id.replace('image', '') )
  ;

  if ( imgId < hashId ) {
    var imgParent = document.getElementById('image' + hashId).parentNode.parentNode;
    gallery.insertBefore(imgCont, imgParent);
  } else {
    gallery.appendChild(imgCont);
  }

  utils.resizeImage(imgEle);

  if ( addEvent && images ) {
    imgEle.addEventListener('load', function () {
      imgEle.parentNode.parentNode.className = 'displayed';
      loadImages(images);
    });
  }

  return imgCont;
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



module.exports = addImageGallery;
