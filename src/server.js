
const fetch = require('node-fetch')
const ProductStore = require('./store/product')
const { makeHmCrawler } = require('./crawlers/hm');

(async () => {
  try {
    const crawler = makeHmCrawler({ fetch, store: ProductStore })
    await crawler.crawl()

    console.log('finished')
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
})()
