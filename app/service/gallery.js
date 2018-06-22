'use strict';

const Service = require('egg').Service;

class GalleryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.proxy = this.ctx.app.model.Gallery;
  }

  async fetch() {
    const data = await this.proxy.find();
    return data.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const data = await this.proxy.findById(_id);
    return data && data.toJSON();
  }

  async create({ imgSrc, linkUrl, order }) {
    const now = Date.now();
    const data = await this.proxy.create({
      imgSrc, linkUrl, order,
      created_time: now, updated_time: now,
    });
    return data.toJSON();
  }

  async update(_id, { imgSrc, linkUrl, order }) {
    await this.proxy.update({ _id }, { $set: {
      imgSrc, linkUrl, order,
      updated_time: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const data = await this.proxy.findOneAndRemove({ _id });
    return data && data.toJSON();
  }
}

module.exports = GalleryService;
