const _ = require('lodash')
const mongoose = require('mongoose')
const ProductSchema = require('../schema/product')

export class ProductModel {
  constructor ({ dbClient }) {
    if (_.isNil(dbClient) || !_.isFunction(dbClient.connect)) {
      throw new Error('Invalid db client')
    }
  }

  static get model () {
    return mongoose.model('Product', ProductSchema)
  }

  async sync (partner, products) {
    await this.dbClient.connect()
    const ops = this._buildSyncOps(partner, products)
    await this.model.bulkWrite(ops)
  }

  _buildSyncOps (partner, products) {
    if (!products || products.length === 0) {
      throw new Error('invalid or empty products')
    }

    if (!partner) {
      throw new Error('invalid partner')
    }

    // scan out of stock products
    const ops = [{
      updateMany: {
        filter: { partner, url: { $nin: products.map(({ url }) => url) } },
        update: { inStock: false }
      }
    }]

    // Upsert products
    for (const product of products) {
      ops.push({
        updateOne: {
          filter: { url: product.url, partner },
          update: {
            title: product.title,
            partner: product.partner,
            media: product.media,
            url: product.url,
            price: product.price,
            inStock: true,
            lastUpdate: Date.now()
          },
          upsert: true
        }
      })
    }

    return ops
  }
}
