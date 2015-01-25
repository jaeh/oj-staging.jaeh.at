'use strict';

var utils       = require('./utils')
  , imageLoader = require('./imageLoader')
;

/*
 * renders the image gallery
 * 
*/
function addImageGallery() {
  var pathName = document.location.pathname
    , gallery  = document.querySelector('noscript#gallery')
  ;

  if ( gallery.innerHTML ) {
    var imageList    = imageLoader.getImagesFromNoscript('noscript#gallery')
      , galleryDiv   = document.createElement('div')
      , galleryUl    = document.createElement('ul')
      , contentDiv   = document.querySelector('#content')
      , menuHeight   = utils.outerHeight('#extra-menu-container')
      , headerHeight = utils.outerHeight('header.main')
      , height       = window.innerHeight - (menuHeight + headerHeight)
      , width        = utils.outerWidth(contentDiv) * .9
    ;

    galleryDiv.id = 'imageGallery';

    utils.each(imageList, function (image, key) {
      var liEle     = document.createElement('li')
        , linkEle   = document.createElement('a')
        , imgEle    = document.createElement('img')
        , tmpSrc    = image.src.split('/')
        , imageName = tmpSrc[tmpSrc.length - 1]
        , locHash   = location.hash.replace('#', '')
      ;

      if ( ! location.hash ) {
        location.hash = '#' + image.id;
      }

      delete tmpSrc[tmpSrc.length - 1];
      //has to be below the delete
      var path = tmpSrc.join('/');

      linkEle.href = '/#' + image.id;
      imgEle.src = path + 'thumb/' + imageName;
      imgEle.id  = image.id;
      imgEle.title = image.title;

      if ( imgEle.id === locHash ) {
        imgEle.classList.add('active');
      }
      linkEle.appendChild(imgEle);
      liEle.appendChild(linkEle);
      galleryUl.appendChild(liEle);
    });

    //~ galleryUl.innerHTML = JSON.stringify(imageList, 2);
    galleryDiv.appendChild(galleryUl);
    contentDiv.appendChild(galleryDiv);
  }
  document.addEventListener('keyup', function (evt) {
    var kC      = evt.keyCode
      , image   = false
      , nextImg = false
      , sibling = false
      , actives = document.querySelectorAll('.active')
      , image   = document.querySelector(location.hash)
      , parent  = image.parentNode.parentNode
    ;

    if ( kC === 37 || kC === 38 || kC === 39 || kC === 40 || kC === 32 ) {
      evt.preventDefault();
    }

    if ( kC === 37 ) { //left arrow keyboard key
      if ( parent.previousSibling ) {
        sibling = parent.previousSibling;
      } else {
        sibling = parent.parentNode.lastChild;
      }
    } else if ( kC === 38 ) { //up arrow
      var imgWidth     = utils.outerWidth(image.parentNode.parentNode)
        , imagesPerRow = Math.round(window.innerWidth / imgWidth)
      ;
      var sib = parent;
      for ( var i = 0; i < imagesPerRow; i++ ) {
        if (sib.previousSibling ) {
          sib = sib.previousSibling;
        } else {
          sib = false
        }
      }
      if ( sib ) {
        sibling = sib;
      }
    } else if ( kC === 39 ) { //right arrow
      if ( parent.nextSibling ) {
        sibling = parent.nextSibling;
      } else {
        sibling = parent.parentNode.firstChild;
      }
    } else if ( kC === 40 ) { //down arrow
      var imgWidth     = utils.outerWidth(image.parentNode.parentNode)
        , imagesPerRow = Math.round(window.innerWidth / imgWidth)
      ;
      var sib = parent;
      for ( var i = 0; i < imagesPerRow; i++ ) {
        if (sib.nextSibling ) {
          sib = sib.nextSibling;
        } else {
          sib = false
        }
      }
      if ( sib ) {
        sibling = sib;
      }
    } else if ( kC === 32 ) { //space
      if ( evt.target.id ) {
        location.href = '/#' + evt.target.id
      }
      //~ var currentImg   = imageLoader.getImageByHash()
        //~ , bigSrc       = currentImg.src.replace('/thumb', '')
        //~ , imgCont      = document.querySelector('div#big-image-container')
      //~ ;
      //~ if ( imgCont && typeof imgCont.querySelector === 'function') {
        //~ document.body.classList.remove('big-image');
        //~ utils.fadeOutAndRemove(imgCont);
      //~ } else {
        //~ imgCont = document.createElement('div');
        //~ var img = document.createElement('img');
        //~ img.src = bigSrc;
        //~ imgCont.id = 'big-image-container';
        //~ imgCont.appendChild(img);
//~ 
        //~ document.body.classList.add('big-image');
        //~ document.body.appendChild(imgCont);
      //~ }
      //~ console.log('kC 32, space key pressed', currentImg);
    }
    if ( sibling ) {
      nextImg = sibling.querySelector('img');

      location.hash = '#' + nextImg.id;

      utils.each(actives, function (active) {
        if ( active.classList ) {
          active.classList.remove('active');
        }
      });
      nextImg.classList.add('active');
    }
    return false;
  });
  window.addEventListener('hashChange', function (evt) {
    evt.preventDefault();
    return false;
  });
}



module.exports = addImageGallery;
