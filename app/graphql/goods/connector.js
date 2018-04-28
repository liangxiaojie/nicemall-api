'use strict';

class GoodsConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Goods;
  }

  async fetch() {
    const goodses = await this.ctx.app.model.Goods.find();
    return goodses.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const goods = await this.proxy.findById(_id);
    return goods && goods.toJSON();
  }

  async create(imgSrc, title, discription, price, priceOld, sales) {
    const goods = await this.proxy.create({ imgSrc, title, discription, price, priceOld, sales });
    return goods.toJSON();
  }

  async update(_id, imgSrc, title, discription, price, priceOld, sales) {
    await this.proxy.update({ _id }, { $set: { imgSrc, title, discription, price, priceOld, sales } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const goods = await this.proxy.findOneAndRemove({ _id });
    return goods && goods.toJSON();
  }

}

module.exports = GoodsConnector;
