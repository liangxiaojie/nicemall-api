'use strict';

const Service = require('egg').Service;

class CartGoodsService extends Service {
  constructor(ctx) {
    super(ctx);
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

  async create(user_id, { cart_id, goods_id, goods_type, number, spec }) {
    const now = Date.now();
    const data = await this.proxy.create({
      user_id, cart_id, goods_id, goods_type, number, spec,
      created_time: now, updated_time: now,
    });
    return data.toJSON();
  }

  async update(_id, { cart_id, goods_id, goods_type, number, spec }) {
    await this.proxy.update({ _id }, { $set: {
      cart_id, goods_id, goods_type, number, spec,
      updated: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const data = await this.proxy.findOneAndRemove({ _id });
    return data && data.toJSON();
  }
}

module.exports = CartGoodsService;
