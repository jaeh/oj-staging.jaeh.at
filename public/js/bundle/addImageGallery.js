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
    , gallery = document.querySelector('noscript#gallery')
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
    console.log('width', width, 'height', height);
    
    galleryDiv.id = 'imageGallery';

    console.log('imageList', imageList);

    utils.each(imageList, function (image, key) {
      var liEle = document.createElement('li')
        , linkEle = document.createElement('a')
        , imgEle  = document.createElement('img')
        , tmpSrc  = image.src.split('/')
        , imageName = tmpSrc[tmpSrc.length - 1]
        , imageNumId = image.id.replace('image', '')
      ;
      delete tmpSrc[tmpSrc.length - 1];

      var path = tmpSrc.join('/');

      linkEle.href = path + '#image-' + imageNumId;
      imgEle.src = path + 'thumb/' + imageName;
      imgEle.id  = image.id;
      imgEle.title = image.title;

      linkEle.appendChild(imgEle);
      liEle.appendChild(linkEle);
      galleryUl.appendChild(liEle);
    });

    //~ galleryUl.innerHTML = JSON.stringify(imageList, 2);
    galleryDiv.appendChild(galleryUl);
    contentDiv.appendChild(galleryDiv);
  }
}



module.exports = addImageGallery;
