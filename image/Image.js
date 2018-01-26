var mongoose = require('mongoose');
var ImageSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
});
mongoose.model('Image', ImageSchema);
module.exports = mongoose.model('Image');