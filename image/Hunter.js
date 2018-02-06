var express = require('express');
var router = express.Router();
var Image = require('./Image');


// GETS IMAGES BY A WORD CONTAINED IN THE DESCRIPTION
router.get('/:keyword', (request, response) => {

    Image.findByText(request.params.keyword)
        .then(images => {
            if (!images) return response.status(404).send("No image found.");
            response.status(200).send(images);
        })
        .catch(error => {
            response.status(500).send("There was a problem finding the image by the given keyword.");
        });
});

module.exports = router;