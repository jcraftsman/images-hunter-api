var express = require('express');
var router = express.Router();

class HuntApiRouter {
    constructor(findImages) {
        this.findImages = findImages;
    }

    configure() {
        router.get('/:keyword', this.hunt());
        return router;
    }

    hunt() {
        return (request, response) => {

            this.findImages.byText(request.params.keyword)
                .then(images => {
                    if (!images) return response.status(404).send("No image found.");
                    response.status(200).send(images);
                })
                .catch(error => {
                    response.status(500).send("There was a problem finding the image by the given keyword.");
                });
        }
    }
}

module.exports = HuntApiRouter;