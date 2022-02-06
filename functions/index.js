const functions = require('firebase-functions')
const { crawl } = require('./app/server')

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

exports.crawl = functions.https.onRequest(async (request, response) => {
  try {
    await crawl()
    response.send('Success')
    functions.logger.info('Successfully crawled data', { structuredData: true })
  } catch (error) {
    functions.logger.error('Hello logs!', { structuredData: true })
    response.send(JSON.stringify(error))
  }
})
