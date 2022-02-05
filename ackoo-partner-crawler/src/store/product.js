const algoliasearch = require('algoliasearch')
const client = algoliasearch('LDYPSN4SDY', 'dfbc030a96a5796f5d10d27e893c257e')
const index = client.initIndex('dev_ackoo_products')

const ProductStore = {
  sync: async (products) => {
    await index.replaceAllObjects(products)
  }
}

module.exports = ProductStore
