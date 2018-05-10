'use strict';

class GalleryConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Gallery;
  }

  async fetch() {
    const gallerys = await this.proxy.find();
    return gallerys.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const gallery = await this.proxy.findById(_id);
    return gallery && gallery.toJSON();
  }

  async create({ imgSrc, linkUrl, order }) {
    const now = Date.now();
    const gallery = await this.proxy.create({
      imgSrc, linkUrl, order,
      created_time: now, updated_time: now,
    });
    return gallery.toJSON();
  }

  async update(_id, { imgSrc, linkUrl, order }) {
    await this.proxy.update({ _id }, { $set: {
      imgSrc, linkUrl, order,
      updated_time: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const gallery = await this.proxy.findOneAndRemove({ _id });
    return gallery && gallery.toJSON();
  }

}

module.exports = GalleryConnector;
