'use strict';

class GoodsConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Goods;
  }

  async fetch(query, first, skip, sortBy) {
    if (query && query.type === -1) {
      delete query.type;
    }
    const cursor = this.proxy.find(query);

    if (sortBy) cursor.sort([[ `${sortBy}`, -1 ]]);
    if (skip) cursor.skip(skip);
    if (first) cursor.limit(first);

    const goodses = await cursor.exec();

    return goodses.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const goods = await this.proxy.findById(_id);
    return goods && goods.toJSON();
  }

  async create({ name, type, title, discription, imgSrc, store_nums, price, priceOld, sales }) {
    const now = Date.now();
    const goods = await this.proxy.create({
      name, type, title, discription, imgSrc, store_nums, price, priceOld, sales,
      created_time: now, updated_time: now,
    });
    return goods.toJSON();
  }

  async update(_id, { name, type, title, discription, imgSrc, store_nums, price, priceOld, sales }) {
    await this.proxy.update({ _id }, { $set: {
      name, type, title, discription, imgSrc, store_nums, price, priceOld, sales,
      updated_time: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const goods = await this.proxy.findOneAndRemove({ _id });
    return goods && goods.toJSON();
  }

}

module.exports = GoodsConnector;
