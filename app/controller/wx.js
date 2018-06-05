'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

class wxController extends Controller {
  async index() {
    const { ctx } = this;
    const query = ctx.request.query;

    const rule = {
      signature: {
        type: 'string',
      },
      timestamp: {
        type: 'string',
      },
      nonce: {
        type: 'string',
      },
      echostr: {
        type: 'string',
      },
    };
    // 校验参数
    ctx.validate(rule, query);

    // 1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    const { signature, timestamp, nonce, echostr } = query;
    const token = 'asdhfsjsjkdfjkjjjkj';

    // 2.将token、timestamp、nonce三个参数进行字典序排序
    const array = [ token, timestamp, nonce ].sort();

    // 3.将三个参数字符串拼接成一个字符串进行sha1加密
    const tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); // 创建加密类型
    const resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); // 对传入的字符串进行加密

    // 4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
      ctx.body = echostr;
    } else {
      ctx.body = 'mismatch';
    }
  }
}

module.exports = wxController;