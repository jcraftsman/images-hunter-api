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
        .catch(error => {
            response.status(500).send("There was a problem adding the information to the database.");
        })
        .then(image => {
            response.status(200).send(image);
        })
});

// RETURNS ALL THE IMAGES IN THE DATABASE
router.get('/', (request, response) => {
    Image.find()
        .catch(error => {
            response.status(500).send("There was a problem finding the images.")
        })
        .then(images => {
            response.status(200).send(images);
        });
});

// GETS A SINGLE IMAGE FROM THE DATABASE
router.get('/:id', (request, response) => {
    Image.findById(request.params.id)
        .catch(error => {
            response.status(500).send("There was a problem finding the image.");
        })
        .then(image => {
            if (!image) return response.status(404).send("No image found.");
            response.status(200).send(image);
        });
});

// DELETES AN IMAGE FROM THE DATABASE
router.delete('/:id', (request, response) => {
    Image.findByIdAndRemove(request.params.id)
        .catch(error => {
            response.status(500).send("There was a problem deleting the image.");
        })
        .then(image => {
            if (!image) return response.status(404).send("No image found.");
            response.status(204).send();
        });
});

router.delete('/', (request, response) => {
    Image.deleteAll()
        .catch(error => {
            response.status(500).send("There was a problem deleting all the images.");
        })
        .then(image => {
            response.status(204).send();
        });
});

module.exports = router;