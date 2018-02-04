const mongoose = require('mongoose');
const SCHEMA = {
  name: String,
  url: String,
  description: String,
};

const ImageSchema = new mongoose.Schema(SCHEMA);
const imagesRepository = mongoose.model('Image', ImageSchema);

const findByText = (text) => {
  const findByKeywordRegex = new RegExp(text, 'i');
  const findByKeywordInDescriptionQuery = {
    "description": findByKeywordRegex
  };
  return imagesRepository.find(findByKeywordInDescriptionQuery)
}
const create = (query) => (imagesRepository.create(query));
const find = (query) => (imagesRepository.find(query));
const findById = (id) => (imagesRepository.findById(id));
const findByIdAndRemove = (id) => (imagesRepository.findByIdAndRemove(id));
const deleteAll = () => (imagesRepository.remove({}));

const imageHunter = {
  create,
  find,
  findByText,
  findById,
  findByIdAndRemove,
  deleteAll,
};
module.exports = imageHunter;