'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  constructor(ctx) {
    super(ctx);
    this.proxy = this.ctx.app.model.Order;
  }

  async fetch(query, first, skip) {
    const data = await this.proxy.find(query).limit(first).skip(skip);
    return data.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const data = await this.proxy.findById(_id);
    return data && data.toJSON();
  }

  async create({ name, title, discription, price, priceOld, sales }) {
    const now = Date.now();
    const data = await this.proxy.create({
      name, title, discription, price, priceOld, sales,
      created_time: now, updated_time: now,
    });
    return data.toJSON();
  }

  async update(_id, { name, title, discription, price, priceOld, sales }) {
    await this.proxy.update({ _id }, { $set: {
      name, title, discription, price, priceOld, sales,
      updated_time: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const data = await this.proxy.findOneAndRemove({ _id });
    return data && data.toJSON();
  }
}

module.exports = OrderService;
