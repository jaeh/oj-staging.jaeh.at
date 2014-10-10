var express = require('express')
  , path    = require('path')
  , favicon = require('serve-favicon')
  , stylus  = require('stylus')

  , public  = path.join(__dirname, 'public')
  , lib     = path.join(__dirname, 'lib')
  , views   = path.join(__dirname, 'views')

  , router  =  require( path.join(process.cwd(), 'lib', 'router') )

  , app = express();

// view engine setup
app.set('views', views);
app.set('view engine', 'jade');

app.use( favicon( path.join(public, 'favicon.ico') ) );

app.use( stylus.middleware(public) );

app.use( express.static(public) );

app.use( router );

module.exports = app;
