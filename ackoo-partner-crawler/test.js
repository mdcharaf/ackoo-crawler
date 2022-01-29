const { makeProductsStore } = require('./store/productStore');
const { dbClient } = require('./db/client');
const { ProductModel } = require('./db/models/productModel')

const catalogue = [
  {
    title: 'test1',
    partner: 'hm',
    url: 'test url',
    media: ['testmedia'],
    price: 50,
    inStock: true,
  },
  {
    title: 'test3',
    partner: 'hm',
    url: 'test2 url',
    media: ['test2media'],
    price: 100,
    inStock: true,
  },
];

(async () => {
  try {
    const store = makeProductsStore({ model: ProductModel, dbClient });
    await store.sync('hm', catalogue);
    console.log('finished');
  } catch (error) {
    console.log(error)
  } finally {
    process.exit();
  }
})();
