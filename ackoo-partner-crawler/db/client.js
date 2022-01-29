const mongoose = require('mongoose');

async function dbConnect(url) {
  await mongoose.connect('mongodb://localhost:27017/test');
}

module.exports = { dbConnect }