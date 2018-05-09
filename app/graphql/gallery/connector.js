'use strict';

class OrderConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Gallery;
  }

  async fetch() {
    const gallerys = await this.proxy.find();
    return gallerys.map(g => g.toJSON());
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
