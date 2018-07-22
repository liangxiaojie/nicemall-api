'use strict';

const Service = require('egg').Service;
const xml2js = require('xml2js');
const crypto = require('crypto');
const { wxConfig } = require('../../app.config');

class OrderService extends Service {
  constructor(ctx) {
    super(ctx);
    this.proxy = this.ctx.app.model.Order;
    this.goodsProxy = this.ctx.app.model.Goods;
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
    const goodses = await this.goodsProxy.find({ _id: { $in: cart_goodses.map(d => d.goods_id) } });
    cart_goodses.map(i => { // eslint-disable-line
      i.goods = goodses.find(i1 => i1._id == i.goods_id); // eslint-disable-line
    });
    let total_fee = 0;
    cart_goodses.map(i => { // eslint-disable-line
      total_fee += i.goods.price * i.number;
    });

    function makeSign(body) {
      let strSignTemp = '';
      Object.keys(body).sort().map(i => {
        if (!body[i]) return false;
        strSignTemp += `${i}=${body[i]}&`;
        return i;
      });

      strSignTemp += `key=${wxConfig.api_key}`;

      return crypto.createHash('md5').update(strSignTemp).digest('hex')
        .toUpperCase();
    }

    const ip = this.ctx.request.ip.match(/\d+.\d+.\d+.\d+/);

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
      total_fee,
      trade_type: 'JSAPI',
    };

    body.sign = makeSign(body);

    const content = this.builder.buildObject(body);

    const res = await this.ctx.curl('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      method: 'POST',
      content,
      dataType: 'text',
    });

    const resData = await new Promise((resolve, reject) => {
      this.parser.parseString(res.data, (err, result) => {
        if (err) reject(err);
        resolve(result.xml);
      });
    });

    const prepay = {
      appId: wxConfig.appid,
      timeStamp: (Date.now() / 1000).toFixed(0),
      nonceStr: Math.random().toString(36).substr(2, 32),
    };

    if (resData.return_msg === 'OK') {
      prepay.package = `prepay_id=${resData.prepay_id}`;
      prepay.paySign = makeSign(prepay);
      prepay.signType = 'MD5';
    }

    return {
      prepay,
    };

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
