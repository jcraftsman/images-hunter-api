var express = require('express');
var router = express.Router();
var Image = require('./Image');


// GETS IMAGES BY A WORD CONTAINED IN THE DESCRIPTION
router.get('/:keyword', function (request, response) {

    const findByKeywordRegex = new RegExp( request.params.keyword, 'i');
    const findByKeywordInDescriptionQuery = {
        "description": findByKeywordRegex
    };

    Image.find(findByKeywordInDescriptionQuery, function (error, image) {
        if (error) return response.status(500).send("There was a problem finding the image by the given keyword.");
        if (!image) return response.status(404).send("No image found.");
        response.status(200).send(image);
    });
});

module.exports = router;