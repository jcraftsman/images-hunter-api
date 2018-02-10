const db = require('./db');
const App = require('./App');

const imagesMongoRepository = require('./imagesMongoRepository')

const ImagesApiRouter = require('../interfaces/ImagesApiRouter')
const HuntApiRouter = require('../interfaces/HuntApiRouter')
const FindImages = require('../domain/FindImages')
const ImagesIndex = require('../domain/ImagesIndex')
const ClearImages = require('../domain/ClearImages')


const findImages = new FindImages(imagesMongoRepository);
const imagesIndex = new ImagesIndex(imagesMongoRepository);
const clearImages = new ClearImages(imagesMongoRepository);

const imagesApiRouter = new ImagesApiRouter(findImages, imagesIndex, clearImages)
const huntApiRouter = new HuntApiRouter(findImages)

const app = new App(imagesApiRouter, huntApiRouter).start();

module.exports = app;