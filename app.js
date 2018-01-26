var express = require('express');
var app = express();
var db = require('./db');

var imageController = require('./image/ImageController');
var hunter = require('./image/Hunter');
app.use('/images', imageController);
app.use('/hunt', hunter);

module.exports = app;