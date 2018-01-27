var express = require('express');
var router = express.Router();
var Image = require('./Image');

// CREATES A NEW IMAGE
router.post('/', function (request, response) {
    Image.create({
            name: request.body.name,
            url: request.body.url,
            description: request.body.description
        },
        function (error, image) {
            if (error) return response.status(500).send("There was a problem adding the information to the database.");
            response.status(200).send(image);
        });
});
// RETURNS ALL THE IMAGES IN THE DATABASE
router.get('/', function (request, response) {
    Image.find({}, function (error, Images) {
        if (error) return response.status(500).send("There was a problem finding the images.");
        response.status(200).send(Images);
    });
});

// GETS A SINGLE IMAGE FROM THE DATABASE
router.get('/:id', function (request, response) {
    Image.findById(request.params.id, function (error, image) {
        if (error) return response.status(500).send("There was a problem finding the image.");
        if (!image) return response.status(404).send("No image found.");
        response.status(200).send(image);
    });
});

// DELETES AN IMAGE FROM THE DATABASE
router.delete('/:id', function (request, response) {
    Image.findByIdAndRemove(request.params.id, function (error, image) {
        if (error) return response.status(500).send("There was a problem deleting the image.");
        if (!image) return response.status(404).send("No image found.");
        response.status(200).send("Image " + image + " was deleted.");
    });
});

module.exports = router;