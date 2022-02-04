
const { makeProductsStore } = require('./store/productStore')
const { dbClient } = require('./db/mongoDbClient')
const { ProductModel } = require('./db/models/productModel')
const { makeHmCrawler } = require('./crawlers/hm')
const fetch = require('node-fetch');

(async () => {
  try {
    const store = makeProductsStore({ model: ProductModel, dbClient })
    const crawler = makeHmCrawler({ fetch, store })
    await crawler.crawl()

    console.log('finished')
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
})()
