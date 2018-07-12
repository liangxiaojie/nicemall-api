'use strict';

const Service = require('egg').Service;

class GoodsService extends Service {
  constructor(ctx) {
    super(ctx);
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

    const data = await cursor.exec();

    return data.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const data = await this.proxy.findById(_id);
    return data && data.toJSON();
  }

  async create({ name, type, title, discription, imgSrc, store_nums, price, priceOld, sales, detail }) {
    const now = Date.now();
    const data = await this.proxy.create({
      name, type, title, discription, imgSrc, store_nums, price, priceOld, sales, detail,
      created_time: now, updated_time: now,
    });
    return data.toJSON();
  }

  async update(_id, { name, type, title, discription, imgSrc, images, store_nums, price, priceOld, sales, detail }) {
    await this.proxy.update({ _id }, { $set: {
      name, type, title, discription, imgSrc, images, store_nums, price, priceOld, sales, detail,
      updated_time: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const data = await this.proxy.findOneAndRemove({ _id });
    return data && data.toJSON();
  }
}

module.exports = GoodsService;
