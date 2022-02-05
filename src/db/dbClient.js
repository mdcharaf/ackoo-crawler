const mongoose = require('mongoose')

const dbClient = {
  connect: async () => {
    await mongoose.connect('mongodb://localhost:27017/ackoo')
  }
}

module.exports = { dbClient }
