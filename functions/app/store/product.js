const config = require('firebase-functions').config()
const algoliasearch = require('algoliasearch')
const client = algoliasearch(config.algolia.apiKey, config.algolia.adminKey)
const index = client.initIndex('dev_ackoo_products')

const ProductStore = {
  sync: async (products) => {
    await index.replaceAllObjects(products)
  }
}

module.exports = ProductStore
