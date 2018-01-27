var express = require('express');
var router = express.Router();
var Image = require('./Image');

// CREATES A NEW IMAGE
router.post('/', function (req, res) {
    Image.create({
            name: req.body.name,
            url: req.body.url,
            description: req.body.description
        },
        function (err, Image) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(Image);
        });
});
// RETURNS ALL THE IMAGES IN THE DATABASE
router.get('/', function (req, res) {
    Image.find({}, function (err, Images) {
        if (err) return res.status(500).send("There was a problem finding the images.");
        res.status(200).send(Images);
    });
});

// GETS A SINGLE IMAGE FROM THE DATABASE
router.get('/:id', function (req, res) {
    Image.findById(req.params.id, function (err, image) {
        if (err) return res.status(500).send("There was a problem finding the image.");
        if (!image) return res.status(404).send("No image found.");
        res.status(200).send(image);
    });
});

// DELETES AN IMAGE FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Image.findByIdAndRemove(req.params.id, function (err, image) {
        if (err) return res.status(500).send("There was a problem deleting the image.");
        if (!image) return res.status(404).send("No image found.");
        res.status(200).send("Image " + image + " was deleted.");
    });
});

module.exports = router;