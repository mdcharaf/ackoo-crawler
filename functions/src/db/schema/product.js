
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  _id: String,
  title: String,
  partner: String,
  url: String,
  media: Array,
  price: Number,
  inStock: Boolean,
  lastUpdate: Date
})

module.exports = ProductSchema
