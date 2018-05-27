'use strict';

exports.wxLogin = async ctx => {
  const body = ctx.request.body;
  const appId = 'wx_gz_config.appid';
  const successUrl = body.successUrl;
  const redirectUrl = '/index/wx/wxInfo.html?successUrl=' + successUrl;

  // snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId
  + '&redirect_uri=' + encodeURIComponent(redirectUrl)
  + '&response_type=code'
  + '&scope=snsapi_userinfo'
  + '&state=xx'
  + '#wechat_redirect';

  ctx.body = {
    code: '0',
    message: 'success',
    data: { url },
  };
};

exports.login = async ctx => {
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

  const user = await ctx.model.User.findOne({
    where: ctx.request.body,
  });
  if (!user) {
    ctx.body = {
      code: '10000',
      message: '用户不存在',
    };
  }

  ctx.session.user = user;
  ctx.body = {
    code: '0',
    message: 'success',
    data: user,
  };
};

exports.register = async ctx => {
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
};
