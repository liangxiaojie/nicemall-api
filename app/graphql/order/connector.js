'use strict';

class OrderConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Order;
  }

  async fetch(query, first, skip) {
    const orders = await this.proxy.find(query).limit(first).skip(skip);
    return orders.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const order = await this.proxy.findById(_id);
    return order && order.toJSON();
  }

  async create({ name, title, discription, price, priceOld, sales }) {
    const now = Date.now();
    const order = await this.proxy.create({
      name, title, discription, price, priceOld, sales,
      created_time: now, updated_time: now,
    });
    return order.toJSON();
  }

  async update(_id, { name, title, discription, price, priceOld, sales }) {
    await this.proxy.update({ _id }, { $set: {
      name, title, discription, price, priceOld, sales,
      updated_time: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const order = await this.proxy.findOneAndRemove({ _id });
    return order && order.toJSON();
  }

}

module.exports = OrderConnector;
