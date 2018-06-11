'use strict';

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.User;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  async fetch() {
    const gallerys = await this.proxy.find();
    return gallerys.map(g => g.toJSON());
  }

  // fetch(ids) {
  //   const users = this.ctx.app.model.User.find({
  //     _id: {
  //       $in: ids,
  //     },
  //   }).then(us => us.map(u => u.toJSON()));
  //   return users;
  // }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }
}

module.exports = UserConnector;

