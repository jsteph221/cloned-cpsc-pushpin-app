var express = require('express')
    , app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var AWS = require('aws-sdk');



var routes = require('./routes/index');
var users = require('./routes/users');


// connect db
//mongoose.connect('mongodb://mongo:27017');

// connect aws S3
var s3Config = { "accessKeyId": "AKIAIV2MK57QBCDG2PIQ", 
                 "secretAccessKey": "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", 
                 "region": "us-west-2" };
AWS.config.update(s3Config);
var s3 = new AWS.S3();
var myBucket = 'cs319-tetrad-development-bucket';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/test', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("ERROR: "+ err.message);
    if (!res.headersSent){
        res.send('error', {
            message: err.message,
            error: {}
        });}
});


module.exports = app;
