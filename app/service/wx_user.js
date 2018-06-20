'use strict';

const Service = require('egg').Service;
const request = require('request-promise-native');
const { wxConfig } = require('../../app.config');

class UserService extends Service {
  async getWxUserByCode(code) {
    const { ctx } = this;
    let user;

    let res = await request(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.appid}&secret=${wxConfig.secret}&code=${code}&grant_type=authorization_code`);
    res = JSON.parse(res);
    // const { access_token, expires_in, refresh_token, openid, scope } = res;
    const { access_token, openid } = res;
    user = await ctx.model.User.findOne({ openid });
    if (!user) {
      let userinfo = await request(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`);
      userinfo = JSON.parse(userinfo);
      if (userinfo.openid) {
        const { nickname, sex, province, city, country, headimgurl, privilege, unionid } = userinfo;
        await ctx.model.User.create({
          openid, nickname, sex, province, city, country, headimgurl, privilege, unionid,
        });
      }
      user = userinfo;
    }

    return user;
  }

  async getWxUserById(_id) {
    return await this.ctx.model.WxUser.findOne({ _id });
  }
}

module.exports = UserService;
