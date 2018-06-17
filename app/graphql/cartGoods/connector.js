'use strict';

class GoodsConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.CartGoods;
  }

  async fetchByUserId(user_id) {
    const cursor = this.proxy.find({ user_id });

    const data = await cursor.exec();

    return data.map(d => d.toJSON());
  }

  async fetchById(_id) {
    const data = await this.proxy.findById(_id);
    return data && data.toJSON();
  }

  async create({ cart_id, goods_id, goods_type, number, spec }) {
    const now = Date.now();
    const cart = await this.proxy.create({
      cart_id, goods_id, goods_type, number, spec,
      created_time: now, updated_time: now,
    });
    return cart.toJSON();
  }

  async update(_id, { cart_id, goods_id, goods_type, number, spec }) {
    await this.proxy.update({ _id }, { $set: {
      cart_id, goods_id, goods_type, number, spec,
      updated: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const goods = await this.proxy.findOneAndRemove({ _id });
    return goods && goods.toJSON();
  }

}

module.exports = GoodsConnector;
