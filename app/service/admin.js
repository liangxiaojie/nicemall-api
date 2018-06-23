'use strict';

const Service = require('egg').Service;

class WxUserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.proxy = this.ctx.app.model.Admin;
  }

  async getUserById(_id) {
    const data = await this.proxy.findOne({ _id });
    return {
      _id,
      username: data.username,
      roles: data.roles,
    };
  }

}

module.exports = WxUserService;
