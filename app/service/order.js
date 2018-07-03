'use strict';

const Service = require('egg').Service;
const xml2js = require('xml2js');
const crypto = require('crypto');
const { wxConfig } = require('../../app.config');

class OrderService extends Service {
  constructor(ctx) {
    super(ctx);
    this.proxy = this.ctx.app.model.Order;
    this.builder = new xml2js.Builder({
      headless: true,
      rootName: 'xml',
      cdata: true,
    });
    this.parser = new xml2js.Parser({
      explicitArray: false,
    });
  }

  async fetch(query, first, skip) {
    const data = await this.proxy.find(query).limit(first).skip(skip);
    return data.map(g => g.toJSON());
  }

  async fetchById(_id) {
    const data = await this.proxy.findById(_id);
    return data && data.toJSON();
  }

  async create({ delivery_address, cart_goodses }) {
    const req = this.ctx.req;
    const ip = req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
    console.log(req);
    console.log(ip);
    
    
    const body = {
      appid: wxConfig.appid,
      mch_id: wxConfig.mch_id,
      attach: 'test',
      body: 'JSAPI支付测试',
      detail: 'test',
      nonce_str: Math.random().toString(36).substr(2, 32),
      notify_url: 'test',
      openid: this.ctx.user.openid,
      out_trade_no: 'test',
      spbill_create_ip: ip,
      total_fee: 1,
      trade_type: 'JSAPI',
    };

    let strSignTemp = '';
    Object.keys(body).sort().map(i => {
      if (!body[i]) return false;
      strSignTemp += `${i}=${body[i]}&`;
      return i;
    });

    strSignTemp += `key=${wxConfig.api_key}`;

    console.log(strSignTemp);

    body.sign = crypto.createHash('md5').update(strSignTemp).digest('hex')
      .toUpperCase();

    console.log(body);
    
    const content = this.builder.buildObject(body);
    console.log(content);
    
    const res = await this.ctx.curl('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      method: 'POST',
      content,
      dataType: 'text',
    });
console.log(res);

    this.parser.parseString(res.data, (err, result) => {
      console.log(result);
    });
    
    // const now = Date.now();
    // const data = await this.proxy.create({
    //   delivery_address, cart_goodses,
    //   created_time: now, updated_time: now,
    // });
    // return data.toJSON();
  }

  async update(_id, { name, title, discription, price, priceOld, sales }) {
    await this.proxy.update({ _id }, { $set: {
      name, title, discription, price, priceOld, sales,
      updated_time: Date.now(),
    } });
    return await this.fetchById(_id);
  }

  async delete(_id) {
    const data = await this.proxy.findOneAndRemove({ _id });
    return data && data.toJSON();
  }
}

module.exports = OrderService;
