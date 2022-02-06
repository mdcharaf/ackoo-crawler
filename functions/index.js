const functions = require('firebase-functions')
const { crawl } = require('./app/server')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

exports.crawl = functions.https.onRequest(async (request, response) => {
  try {
    await crawl()
    response.send('Success')
  } catch (error) {
    response.send(JSON.stringify(error))
  }
})
