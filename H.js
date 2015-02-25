'use strict';
var express = require('express')
  , H       = express()
;

H.set('404redirect', '/');

H.use(function(req, res, next){
  res.locals.menu = [
    { href: '/',        name: 'index',   text: 'oliver jiszda' }
  , { href: '/gallery', name: 'gallery', text: 'gallery' }
  , { href: '/contact', name: 'contact', text: 'contact' }
  , { 
        href  : 'http://jiszda.tumblr.com'
      , name  : 'blog'
      , text  : 'blog'
      , target: 'tumblr'
    }
  ];
  next();
});

module.exports = H;
