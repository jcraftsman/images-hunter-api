const express = require('express');
const router = express.Router();
const Image = require('./Image');

// CREATES A NEW IMAGE
router.post('/', (request, response) => {
    Image.create({
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
});

// RETURNS ALL THE IMAGES IN THE DATABASE
router.get('/', (request, response) => {
    Image.find()
        .then(images => {
            response.status(200).send(images);
        })
        .catch(error => {
            response.status(500).send("There was a problem finding the images.")
        });
});

// GETS A SINGLE IMAGE FROM THE DATABASE
router.get('/:id', (request, response) => {
    Image.findById(request.params.id)
        .then(image => {
            if (!image) return response.status(404).send("No image found.");
            response.status(200).send(image);
        })
        .catch(error => {
            response.status(500).send("There was a problem finding the image.");
        });
});

// DELETES AN IMAGE FROM THE DATABASE
router.delete('/:id', (request, response) => {
    Image.findByIdAndRemove(request.params.id)
        .then(image => {
            if (!image) return response.status(404).send("No image found.");
            response.status(204).send();
        })
        .catch(error => {
            response.status(500).send("There was a problem deleting the image.");
        });
});

router.delete('/', (request, response) => {
    Image.deleteAll()
        .then(image => {
            response.status(204).send();
        })
        .catch(error => {
            response.status(500).send("There was a problem deleting all the images.");
        });
});

module.exports = router;