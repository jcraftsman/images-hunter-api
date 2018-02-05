const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const imageController = require('./image/ImageController');
const hunter = require('./image/Hunter');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/images', imageController);
app.use('/hunt', hunter);

module.exports = app;