'use strict';

import {log, each} from './utils';

function htmlToObject(string, values) {
  var obj = {};

  each(values, function (val, valKey) {
    if ( val ) {
      let str = string.split(valKey + '="' )[1];
      if ( str) {
        str = str.split('"')[0];
        obj[valKey] = str;
      }
    }
  });
  return obj;
}

export default function(string, values = {}) {
  if ( typeof string !== 'string' || string === '' ) { 
    return log('Error in Noscript Parser', 'parse function needs a string');
  }
  //default is to get all values
  values.src = values.hasOwnProperty('src') ? values.src : true;
  values.id = values.hasOwnProperty('id') ? values.id : true;
  values.title = values.hasOwnProperty('title') ? values.title : true;

  let replaceRegex = /<img/gi;
  string.replace(replaceRegex, '&lt;img');

  let stringArray = string.split('&lt;img');

  let images = [];

  each(stringArray, function (str, strKey) {
    let strObject = htmlToObject(str, values);
    if ( strObject && strObject.src ) {
      images.push(strObject);
    }
  });

  return images;
}
