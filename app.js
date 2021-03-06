var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var randomstring = require('randomstring');
var request = require('request');
var shangus = require('xml2json');

var arraySort = require('array-sort');

var app = express();


mongoose.connect('mongodb://localhost:27017/hangul') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("MongoDB connect Success");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var word = mongoose.Schema({
    word:String,
    weekSearch:Number,
    monthSearch:Number,
    star:Number
});

var wordModel = mongoose.model('wordModel',word);

require('./routes/parse')(app,request,shangus,wordModel);
require('./routes/star')(app,wordModel);
require('./routes/rank')(app,wordModel,arraySort);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
