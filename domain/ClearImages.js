const Image = require('./Image');
class ClearImages {
    constructor(imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    all() {
        return this.imagesRepository.deleteAll();
    }

    byId(id) {
        return this.imagesRepository.findByIdAndRemove(id);
    }

}

module.exports = ClearImages;