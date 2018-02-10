const express = require('express');
const router = express.Router();

class ImagesApiRouter {
    constructor(findImages, imagesIndex, clearImages) {
        this.findImages = findImages;
        this.imagesIndex = imagesIndex;
        this.clearImages = clearImages;
    }

    configure() {
        router.post('/', this.indexNewImage());
        router.get('/', this.listAllImages());
        router.get('/:id', this.findImageById());
        router.delete('/', this.clearAllImages());
        router.delete('/:id', this.clearAnImageById());
        return router;
    }

    indexNewImage() {
        return (request, response) => {
            this.imagesIndex.process({
                    name: request.body.name,
                    url: request.body.url,
                    description: request.body.description
                })
                .then(image => {
                    response.status(200).send(image);
                })
                .catch(error => {
                    response.status(500).send("There was a problem adding the information to the database.");
                });
        }
    }

    listAllImages() {
        return (request, response) => {
            this.findImages.all()
                .then(images => {
                    response.status(200).send(images);
                })
                .catch(error => {
                    response.status(500).send("There was a problem finding the images.")
                });
        }
    }

    findImageById() {
        return (request, response) => {
            this.findImages.byId(request.params.id)
                .then(image => {
                    if (!image) return response.status(404).send("No image found.");
                    response.status(200).send(image);
                })
                .catch(error => {
                    response.status(500).send("There was a problem finding the image.");
                });
        }
    }
    clearAnImageById() {
        return (request, response) => {
            this.clearImages.byId(request.params.id)
                .then(image => {
                    if (!image) return response.status(404).send("No image found.");
                    response.status(204).send();
                })
                .catch(error => {
                    response.status(500).send("There was a problem deleting the image.");
                });
        }
    }
    clearAllImages() {
        return (request, response) => {
            this.clearImages.all()
                .then(image => {
                    response.status(204).send();
                })
                .catch(error => {
                    response.status(500).send("There was a problem deleting all the images.");
                });
        }
    }

}


module.exports = ImagesApiRouter;