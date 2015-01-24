'use strict';

var utils = require('./utils')
  , Hammer = require('./vendor/hammer')
;

function loadImages(images) {
  images.forEach(function (image) {
    addImageEle(image);
  });
}

function loadFirstImage(selector) {
  var hashId = getHashId()
    , images = getImagesFromNoscript(selector)
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

  //~ imgCont.addEventListener('mouseover', function (evt) {
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
      imgCont.classList.remove('gallery');

      if ( offsetX > imageX - perc10 && offsetX < imageX + perc10 ) {
        imgCont.classList.add('gallery');
      } else if ( offsetX > imageX  ) {
        imgCont.classList.add('right');
      } else {
        imgCont.classList.add('left');
      }
    });
  //~ });

  imgCont.addEventListener('mouseout', function (evt) {
    //~ imgCont.removeEventListener('mousemove');
    imgCont.classList.remove('cursor-right');
    imgCont.classList.remove('cursor-left');
  });

  var gallery = utils.addGallery()
    , hashId = getHashId()
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



function getHashId() {
   return parseInt(location.hash.replace('#image-', '') );
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

function loadPreviousImage() {
  var hashId = getHashId();

  if ( hashId > 1 ) {
    hashId -= 1;
  } else {
    hashId = countImages();
  }
  location.hash = '#image-' + hashId;
}


function getImagesFromNoscript(selector) {
var imageGalleryEle = document.querySelector(selector || 'noscript')
  , imageHTML = imageGalleryEle.innerHTML
  , imageTags = imageHTML.split('&lt;img')
  , imgs = []
;
if ( imageHTML.indexOf('<img') >= 0 ) {
  imageTags = imageHTML.split('<img');
}
//~ log('imageTags', imageTags);

for (var i = 0; i < imageTags.length; i++ ) {
  var img = parseImgTag(imageTags[i]);
  if ( img ) {
    imgs.push( img );
  }
}
imageGalleryEle.parentNode.removeChild(imageGalleryEle);
//~ log('imgs', imgs);
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
    , clickOffsetFromCenter = window.innerWidth * .1
  ;
  
  target.addEventListener('dragstart', utils.disableEvent);
  target.addEventListener('dragstop', utils.disableEvent);

  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

  hammertime.on('tap', function (evt) {
    var x      = evt.center.x
      , center = window.innerWidth / 2
    ;

    //~ utils.log('center', evt.center);
    
    if ( x > center - clickOffsetFromCenter && x < center + clickOffsetFromCenter ) {
      window.location = '/gallery';
    } else if ( x < center - clickOffsetFromCenter ) {
      loadPreviousImage();
    } else if ( x > window.innerWidth / 2 + clickOffsetFromCenter ) {
      loadNextImage();
    }
  });
  
  hammertime.on('swipe', function (evt) {
    var deltaX = evt.deltaX
      , deltaY = evt.deltaY
    ;
    //~ utils.log('delta y/x', deltaY, '/', deltaX);
    if ( deltaY > swipeOffset ) {
      //~ utils.log('swipe down');
      loadNextImage();
    } else if ( deltaY < - swipeOffset ) {
      //~ utils.log('swipe up');
      loadPreviousImage();
    }

    if ( deltaX > swipeOffset ) {
      //~ utils.log('swiperight');
      loadPreviousImage();
    } else if ( deltaX < - swipeOffset ) {
      loadNextImage();
      //~ utils.log('swipeleft');
    }
    
  });
}


module.exports = {
    loadNextImage         : loadNextImage
  , loadPreviousImage     : loadPreviousImage
  , loadFirstImage        : loadFirstImage
  , loadImages            : loadImages
  , getImagesFromNoscript : getImagesFromNoscript
};
