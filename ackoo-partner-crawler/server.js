const fetch = require('node-fetch');
const { makeHmCrawler } = require('./crawlers/hm');

const crawler = makeHmCrawler({ fetch });

( async () => await crawler.crawl() )();