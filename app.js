var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
var imageController = require('./image/ImageController');
var hunter = require('./image/Hunter');

app.use('/images', imageController);
app.use('/hunt', hunter);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

module.exports = app;