
const fetch = require('node-fetch')
const ProductStore = require('./store/product')
const { makeHmCrawler } = require('./crawlers/hm')

async function crawl () {
  try {
    const crawler = makeHmCrawler({ fetch, store: ProductStore })
    await crawler.crawl()
    console.log('finished')
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = { crawl }
