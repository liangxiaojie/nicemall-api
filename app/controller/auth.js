'use strict';

const Controller = require('egg').Controller;
const { wxConfig } = require('../../app.config');

class authController extends Controller {
  async wxLogin() {
    const { ctx } = this;
    const { successUrl } = ctx.request.body;

    // snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
    const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxConfig.appid +
      '&redirect_uri=' + encodeURIComponent(successUrl) +
      '&response_type=code' +
      '&scope=snsapi_userinfo' +
      '&state=xx' +
      '#wechat_redirect';

    ctx.body = {
      success: true,
      message: 'success',
      data: { url },
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

    const user = await ctx.model.User.findOne({
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
      username: user.username,
      roles: user.roles,
    };

    ctx.session.user = data;
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
      data: ctx.session.user,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.session.user = null;
    ctx.body = {
      success: true,
      message: '',
      data: null,
    };
  }

  async register() {
    const { ctx } = this;
    const createRule = {
      name: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    };
    // 校验参数
    ctx.validate(createRule);

    const user = await ctx.model.User.create(ctx.request.body);
    ctx.body = {
      code: 0,
      message: 'success',
      data: {
        user: {
          name: user.name,
        },
      },
    };
  }

}

module.exports = authController;