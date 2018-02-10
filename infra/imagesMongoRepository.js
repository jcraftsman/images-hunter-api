const mongoose = require('mongoose');
const SCHEMA = {
  name: String,
  url: String,
  description: String,
};

const ImageSchema = new mongoose.Schema(SCHEMA);
const imageMongooseModel = mongoose.model('Image', ImageSchema);

const create = (query) => (imageMongooseModel.create(query));
const find = (query) => (imageMongooseModel.find(query));
const findById = (id) => (imageMongooseModel.findById(id));
const findByIdAndRemove = (id) => (imageMongooseModel.findByIdAndRemove(id));
const deleteAll = () => (imageMongooseModel.remove({}));

const imagesMongoRepository = {
  create,
  find,
  findById,
  findByIdAndRemove,
  deleteAll,
};

module.exports = imagesMongoRepository;