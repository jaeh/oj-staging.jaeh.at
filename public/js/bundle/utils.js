'use strict';

export function log() {
  if ( window.log != false) {
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }
}

export function testLocalstorage () {
  try {
      localStorage.setItem('itemtest235', 'mod');
      localStorage.removeItem('itemtest235');
      return true;
  } catch(e) {
      return false;
  }
}

export function getDimensions(ele) {
  var dimensions = {
    height: outerHeight(ele)
  , width: outerWidth(ele)
  };
  return dimensions;
}

export function innerText(ele, text) {
  if ( typeof ele.innerText !== 'undefined' ) {
    ele.innerText = text;
  } else {
    ele.innerHTML = text;
  }
}

export function each(arrOrObj, func, callback) {
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
    ;
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
    log('magic-utils', 'each called without array or object:', arrOrObj);
  }
}

export function disableEvent (evt) {
  evt.preventDefault();
  return false;
}

/*
 * Gets the outer Height of divs, including margin
 */
export function outerHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  if ( ! el ) {
    return 0;
  }
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

/*
 * Gets the outer Width of divs, including margin
 */
export function outerWidth(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  if ( ! el ) {
    return 0;
  }
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginLeft']) +
               parseFloat(styles['marginRight']);

  return Math.ceil(el.offsetWidth + margin);
}

export function loadNextImage() {
  var currentImg = document.querySelector('li.active')
    , nextImg    = currentImg.nextSibling
  ;
  if ( ! nextImg || ! nextImg.classList ) {
    nextImg = currentImg.parentNode.firstChild;
  }

  if ( nextImg.classList ) {
    currentImg.classList.remove('active');
    window.setTimeout( () => {
      nextImg.classList.add('active');
    }, 400);
  }
}

export function loadPreviousImage() {
  var currentImg = document.querySelector('li.active')
    , prevImg    = currentImg.previousSibling
  ;
  if ( ! prevImg || ! prevImg.classList ) {
    prevImg = currentImg.parentNode.lastChild;
  }

  if ( prevImg.classList ) {
    currentImg.classList.remove('active');
    window.setTimeout( () => {
      prevImg.classList.add('active');
    }, 400);
  }
}
