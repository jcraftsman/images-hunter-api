var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
var Image = require('./Image');


// GETS IMAGES BY A WORD CONTAINED IN THE DESCRIPTION
router.get('/:keyword', function (req, res) {

    var findByKeywordRegex = new RegExp( req.params.keyword, 'i');
    const findByKeywordInDescriptionQuery = {
        "description": findByKeywordRegex
    };

    Image.find(findByKeywordInDescriptionQuery, function (err, image) {
        if (err) return res.status(500).send("There was a problem finding the image by the given keyword.");
        if (!image) return res.status(404).send("No image found.");
        res.status(200).send(image);
    });
});

module.exports = router;