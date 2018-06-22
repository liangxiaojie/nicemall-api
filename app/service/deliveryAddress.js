'use strict';

const Service = require('egg').Service;

class DeliveryAddressService extends Service {
  constructor(ctx) {
    super(ctx);
    this.proxy = this.ctx.app.model.DeliveryAddress;
  }

  async fetch(query, first, skip) {
    const data = await this.proxy.find(query).limit(first).skip(skip);
    return data.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const data = await this.proxy.findById(_id);
    return data && data.toJSON();
  }

  async create(user_id, { consignee, phone_number, address, is_default }) {
    const now = Date.now();
    const data = await this.proxy.create({
      user_id, consignee, phone_number, address, is_default,
      created_time: now, updated_time: now,
    });
    return data.toJSON();
  }

  async update(_id, { consignee, phone_number, address, is_default }) {
    await this.proxy.update({ _id }, { $set: {
      consignee, phone_number, address, is_default,
      updated: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const data = await this.proxy.findOneAndRemove({ _id });
    return data && data.toJSON();
  }

}

module.exports = DeliveryAddressService;
