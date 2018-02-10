 const Image = require('./Image');
 class FindImages {
     constructor(imagesRepository) {
         this.imagesRepository = imagesRepository;
     }

     all() {
         return this.imagesRepository.find();
     }

     byId(id) {
         return this.imagesRepository.findById(id);
     }

     byText(text) {
         const findByKeywordRegex = new RegExp(text, 'i');
         const findByKeywordInDescriptionQuery = {
             "description": findByKeywordRegex
         };
         return this.imagesRepository.find(findByKeywordInDescriptionQuery);
     }

 }

 module.exports = FindImages;