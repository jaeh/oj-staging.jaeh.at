'use strict';
var d = document
  , s = d.createElement('script')
;
s.src = '/js/main.js';
d.body.appendChild(s);
var l = d.getElementById('load-js');
l.parentNode.removeChild(l);
