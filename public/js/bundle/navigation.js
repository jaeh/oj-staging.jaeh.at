'use strict';
/*
 * add navigation events and html replacement
 */
/*(function navigation() {

  var menu      = document.querySelector('header.main')
    , menuItems = menu.getElementsByTagName('a')
    , contents  = []
  ;

  function httpGet(url) {
      var xmlHttp = null;

      xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", url, false );
      xmlHttp.send( null );
      return xmlHttp.responseText;
  }


  for ( var key in menuItems ) {
    if ( menuItems.hasOwnProperty(key) 
      && typeof menuItems[key].getAttribute === 'function' ) {
      var menuItem = menuItems[key]
        , link     = menuItem.getAttribute('href')
      ;

      //~ contents[link] = utils.httpGet(link + '?js=1');

      menuItem.addEventListener('click', clickedNavigation);
    }
  }

  function clickedNavigation(evt) {
    evt.preventDefault();

    var link = evt.target.getAttribute('href')
      , contentEle = document.getElementById('content')
    ;

    console.log('link to load', link);
    
    contents[link] = httpGet(link + '?js=1');
    //~ console.log('contents[link]',contents[link]);
    if ( contents[link] ) {
      var tempEle = document.createElement('div');
      tempEle.innerHTML = contents[link];
      console.log('tempEle', tempEle);
      for ( var key in tempEle ) {
        console.log('key', key);
      }
      var contentEle2 = tempEle.querySelector('#content');
      if ( contentEle2 && contentEle2.innerHTML ) {
        contentEle.innerHTML = contentEle2.innerHTML;
        if ( contentEle.innerHTML.indexOf('noscript id="image-gallery"') >= 0 ) {
          console.log('noscript image gallery detected');
          addImageGallery();
        }
      }
    }
  }

})();
*/
