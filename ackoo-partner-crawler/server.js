const fetch = require('node-fetch');
const { makeHmCrawler } = require('./crawlers/hm');
const { dbConnect } = require('./db/client');

// const crawler = makeHmCrawler({ fetch });

(async () => {
  // await crawler.crawl()
  try {
    await dbConnect();
    console.log('finished');
    process.exit();
  } catch (error) {
    console.log(error)
  }
})();