const express = require('express');
const bodyParser = require('body-parser');

class App {

    constructor(imagesApiRouter, huntApiRouter) {
        this.imagesApiRouter = imagesApiRouter;
        this.huntApiRouter = huntApiRouter;
    }

    start() {
        const app = express();
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        app.use('/images', this.imagesApiRouter.configure());
        app.use('/hunt', this.huntApiRouter.configure());
        return app;
    }

}

module.exports = App;