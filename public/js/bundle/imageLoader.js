'use strict';

var utils = require('./utils')
  , Hammer = require('./vendor/hammer')
;

function loadImages(i, images) {
  utils.each(images, function (image) {
    addImageEle(image, false, i);
  });
}

function loadFirstImage(selector) {
  var hash = getHash()
    , images = getImagesFromNoscript(selector)
    , image = images[hash]
  ;
  if ( image ) {
    var galleryEle = utils.addGallery();
    delete images[hash];
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

  imgEle.setAttribute('id', image.id);
  imgEle.setAttribute('src', image.src);
  imgEle.setAttribute('title', image.title);
  imgEle.setAttribute('data-i', image.i);

  imgTitle.innerHTML = image.title;
  imgEleCont.appendChild(imgEle);

  imgCont.appendChild(imgEleCont);
  imgCont.appendChild(imgTitle);
  imgCont.classList.add('cursor');
  swipe(imgCont);

  imgCont.addEventListener('click', function (evt) {
    var x       = evt.x || evt.layerX
      , center  = window.innerWidth / 2
      , imageId = evt.target.id
      , clickOffsetFromCenter = window.innerWidth * .1
    ;

    if ( x > center - clickOffsetFromCenter && x < center + clickOffsetFromCenter ) {
      if ( window.innerHeight > 400 && window.innerWidth > 400 ) {
        utils.inPageFullscreen();
      } else {
        location.href = '/gallery' + location.hash;
      }
    } else if ( x < center - clickOffsetFromCenter ) {
      loadPreviousImage();
    } else if ( x > window.innerWidth / 2 + clickOffsetFromCenter ) {
      loadNextImage();
    }
  });

  imgCont.addEventListener('mousemove', function (mEvt) {
    var imageWidth = utils.outerWidth(imgCont)
      , target  = mEvt.target || mEvt.srcElement
      , rect    = target.getBoundingClientRect()
      , offsetX = mEvt.clientX - rect.left
      , imageX  = ( ( imageWidth - (rect.left * 2 ) ) / 2 )
      , perc10  = window.innerWidth * .1
    ;

    imgCont.classList.remove('left');
    imgCont.classList.remove('right');
    imgCont.classList.remove('zoom-in');
    imgCont.classList.remove('zoom-out');

    if ( offsetX > imageX - perc10 && offsetX < imageX + perc10 ) {
      if ( document.body.className.indexOf('fullscreen') > -1 ) {
        imgCont.classList.add('zoom-in');
      } else {
        imgCont.classList.add('zoom-out');
      }
    } else if ( offsetX > imageX  ) {
      imgCont.classList.add('right');
    } else {
      imgCont.classList.add('left');
    }
  });

  imgCont.addEventListener('mouseout', function (evt) {
    //~ imgCont.removeEventListener('mousemove');
    imgCont.classList.remove('cursor-right');
    imgCont.classList.remove('cursor-left');
  });

  var gallery = utils.addGallery()
    , hashId = image.i
    , imgId = imgEle.getAttribute('data-i')
  ;
  if ( ! addEvent && typeof images === 'number' ) {
    hashId = images;
  }

  if ( imgId < hashId ) {
    var imgParent = document.getElementById('image-' + hashId).parentNode.parentNode;
    gallery.insertBefore(imgCont, imgParent);
  } else {
    gallery.appendChild(imgCont);
  }

  utils.resizeImage(imgEle);

  if ( addEvent && images ) {
    imgEle.addEventListener('load', function () {
      imgEle.parentNode.parentNode.classList.add('displayed');
      loadImages(image.i, images);
    });
  }

  return imgCont;
}



function getHash() {
   return location.hash.replace('#', '');
}
function getImageByHash() {
  return document.querySelector(location.hash);
}

function getImages() {
  var gallery = document.getElementById('gallery-container')
    , images = gallery.getElementsByTagName('img')
  ;
  return images;
}
function countImages() {
  var images = getImages();
  return images.length;
}

function loadNextImage() {
  var image     = getImageByHash()
    , parent    = image.parentNode.parentNode
    , nextSib   = parent.nextSibling
    , nextImage = false
  ;

  if ( nextSib ) {
    nextImage = nextSib.querySelector('img');
  }
  
  if ( ! nextImage ) {
    nextImage = parent.parentNode.firstChild.querySelector('img');
  }
  if ( nextImage ) { 
    location.hash = nextImage.id;
  }
}

function loadPreviousImage() {
  var image     = getImageByHash()
    , parent    = image.parentNode.parentNode
    , prevSib   = parent.previousSibling
    , prevImage = false
  ;

  if ( prevSib ) {
    prevImage = prevSib.querySelector('img');
  }
  if ( ! prevImage ) {
    prevImage = parent.parentNode.lastChild.querySelector('img');
  } else if ( prevImage ) { 
    location.hash = prevImage.id;
  }
}


function getImagesFromNoscript(selector) {
  var imageGalleryEle = document.querySelector(selector || 'noscript')
    , imageHTML = imageGalleryEle.innerHTML
    , imageTags = imageHTML.split('&lt;img')
    , imgs = {}
  ;
  if ( imageHTML.indexOf('<img') >= 0 ) {
    imageTags = imageHTML.split('<img');
  }
  for (var i = 0; i < imageTags.length; i++ ) {
    var img = parseImgTag(imageTags[i]);
    if ( img ) {
      img.i = i;
      imgs[img.id] = img;
    }
  }
  imageGalleryEle.parentNode.removeChild(imageGalleryEle);
  return imgs;
}


function parseImgTag(img) {
  var src = img.split('src="')[1] || ''
    , title = img.split('title="')[1] || ''
    , id = img.split('id="')[1] || ''
  ;
  if ( src ) {
    return {
        id    : id.split('"')[0]
      , src: src.split('"')[0]
      , title : title.split('"')[0]
    };
  }
  return false;
}
function swipe(target) {
  //~ utils.log('target', target);
  var hammertime            = new Hammer(target)
    , swipeOffset           = 50
  ;
  
  target.addEventListener('dragstart', utils.disableEvent);
  target.addEventListener('dragstop', utils.disableEvent);

  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  
  hammertime.on('swipe', function (evt) {
    var deltaX = evt.deltaX
      , deltaY = evt.deltaY
    ;
    //~ utils.log('delta y/x', deltaY, '/', deltaX);
    if ( deltaY > swipeOffset ) {
      loadNextImage();
    } else if ( deltaY < - swipeOffset ) {
      loadPreviousImage();
    }

    if ( deltaX > swipeOffset ) {
      loadPreviousImage();
    } else if ( deltaX < - swipeOffset ) {
      loadNextImage();
    }
  });
}


module.exports = {
    loadNextImage         : loadNextImage
  , loadPreviousImage     : loadPreviousImage
  , loadFirstImage        : loadFirstImage
  , loadImages            : loadImages
  , getImagesFromNoscript : getImagesFromNoscript
  , getImageByHash        : getImageByHash
};
