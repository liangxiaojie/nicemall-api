'use strict';

const Controller = require('egg').Controller;
const request = require('request-promise-native');
const { wxConfig, WWW_URL } = require('../../app.config');

class authController extends Controller {
  async wxLogin() {
    const { ctx } = this;
    const { successUrl } = ctx.request.body;
    const redirectUrl = encodeURIComponent(`${WWW_URL}/loginSuccess`);

    // snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=${successUrl}#wechat_redirect`;

    ctx.body = {
      success: true,
      message: 'success',
      data: { url },
    };
  }

  async wxRefreshToken() {
    const { ctx } = this;

    const refresh_token = '';
    const res = await request(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${wxConfig.appid}&grant_type=refresh_token&refresh_token=${refresh_token}`);

    ctx.body = res;
  }

  async wxCheckAuth() {
    const { ctx } = this;

    const access_token = '';
    const openid = '';
    const res = await request(`https://api.weixin.qq.com/sns/auth?access_token=${access_token}&openid=${openid}`);

    ctx.body = res;
  }

  async wxUserinfo() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    let user;

    if (ctx.isAuthenticated() && ctx.user) {
      user = ctx.user;
    } else if (code) {
      user = await ctx.service.wxUser.getWxUserByCode(code);
      ctx.login(user);
    }

    if (!user) {
      ctx.status = 401;
      throw new Error('Not logged in');
    }

    ctx.body = {
      userinfo: user,
    };
  }

  async login() {
    const { ctx } = this;
    const createRule = {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    };
    // 校验参数
    ctx.validate(createRule);

    const { username, password } = ctx.request.body;

    const user = await ctx.model.Admin.findOne({
      username,
      password,
    });

    if (!user) {
      ctx.body = {
        success: false,
        message: '用户名或密码错误',
      };
      return;
    }

    const data = {
      type: 'admin',
      _id: user._id,
      username: user.username,
      roles: user.roles,
    };

    ctx.login(data);

    ctx.body = {
      success: true,
      message: '登录成功',
      data,
    };
  }

  async userinfo() {
    const { ctx } = this;
    ctx.body = {
      success: true,
      message: '',
      data: ctx.user,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.logout();
    ctx.body = {
      success: true,
      message: '',
      data: null,
    };
  }
}

module.exports = authController;
