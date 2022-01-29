const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  _id: String,
  title: String,
  url: String,
  media: Array,
  price: Number
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = { ProductModel }