var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var imageController = require('./image/ImageController');
var hunter = require('./image/Hunter');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/images', imageController);
app.use('/hunt', hunter);

module.exports = app;