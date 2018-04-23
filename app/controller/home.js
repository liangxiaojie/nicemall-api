'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'nicemall api service';
  }
}

module.exports = HomeController;
