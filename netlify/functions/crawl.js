
const { serve } = require('../../src/server')

exports.handler = async function () {
  try {
    await serve()

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello World'
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `!!!Something went wrong! ${JSON.stringify(error)}`
      })
    }
  }
}
