function makeProductsStore({ dbClient, model }) {
  return Object.freeze({
    sync
  })

  async function sync(partner, catalogue) {
    try {
      await dbClient.connect();
      const ops = _buildSyncOps(partner, catalogue);
      await model.bulkWrite(ops);
    } catch (error) {
      console.log(error);
    }
  }

  function _buildSyncOps(partner, catalogue) {
    if (!catalogue || catalogue.length === 0) {
      throw new Error('invalid or empty catalogue');
    }

    if (!partner) {
      throw new Error('invalid partner');
    }

    // scan out of stock products
    const ops = [{
      updateMany: {
        filter: { partner, title: { $nin: catalogue.map(({ title }) => title) } },
        update: { inStock: false }
      }
    }];

    // Upsert catalogue
    for (const product of catalogue) {
      ops.push({
        updateOne: {
          filter: { title: product.title, partner },
          update: {
            title: product.title,
            partner: product.partner,
            media: product.media,
            url: product.url,
            price: product.price,
            inStock: true,
          },
          upsert: true
        }
      });
    }

    return ops;
  }
}

module.exports = { makeProductsStore }