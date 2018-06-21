'use strict';

const Service = require('egg').Service;

class DeliveryAddressService extends Service {
  constructor(ctx) {
    super(ctx);
    this.proxy = this.ctx.app.model.DeliveryAddress;
  }

  async fetch(query, first, skip) {
    const orders = await this.proxy.find(query).limit(first).skip(skip);
    return orders.map(g => g.toJSON());
  }

  async create(user_id, { consignee, phone_number, address, is_default }) {
    const now = Date.now();
    const cart = await this.proxy.create({
      user_id, consignee, phone_number, address, is_default,
      created_time: now, updated_time: now,
    });
    console.log(cart);
    
    return cart.toJSON();
  }

  async update(_id, { consignee, phone_number, address, is_default }) {
    await this.proxy.update({ _id }, { $set: {
      consignee, phone_number, address, is_default,
      updated: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const goods = await this.proxy.findOneAndRemove({ _id });
    return goods && goods.toJSON();
  }

}

module.exports = DeliveryAddressService;
