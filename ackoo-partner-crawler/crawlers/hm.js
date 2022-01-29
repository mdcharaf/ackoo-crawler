function makeHmCrawler({ fetch }) {
  return Object.freeze({
    crawl
  });

  async function crawl() {
    const catalogue = await _fetchCatalogue();
  }

  async function _fetchCatalogue() {
    let catalogue = [];
    let page = 0;
    let count = 0;
    do {
      const { data, pagesCount } = await _fetch(page);
      catalogue.push(...data);

      count = pagesCount;
    } while (++page < count);

    return catalogue;
  }

  async function _fetch(pageNumber) {
    try {
      const baseUrl = 'https://eg.hm.com';
      const { url, context } = _createRequest(pageNumber);
      const res = await fetch(url, context);
      // TODO: Use defensive code here
      const { results } = await res.json();
      const data = results[0];

      return {
        data: data?.hits?.map(item => ({
          title: item.title.en,
          partner: 'hm',
          media: item.media,
          url: `${baseUrl}${item.url.en}`,
          price: item.price.en,
          inStock: true
        })),
        pagesCount: data.nbPages,
        page: data.page
      }
    } catch (error) {
      console.log(error);
    }
  }

  function _createRequest(pageNumber) {
    return {
      url: 'https://hgr051i5xn-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=HGR051I5XN&x-algolia-api-key=a2fdc9d456e5e714d8b654dfe1d8aed8',
      context: {
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: `{"requests":[{"indexName":"01live_hmeg_product_list_en_created_desc","params":"query=&hitsPerPage=80&page=${pageNumber}&filters=(stock>0)"}]}`,
        method: 'POST'
      }
    }
  }
};

module.exports = { makeHmCrawler };