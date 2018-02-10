const Image = require('./Image');
class ImagesIndex {
    constructor(imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    process(image) {
        return this.imagesRepository.create(image);
    }

}

module.exports = ImagesIndex;