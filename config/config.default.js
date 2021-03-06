'use strict';
const url = require('url');
const { Domain } = require('../app.config');

module.exports = appInfo => {
  const config = exports = {};

  const isDebug = !(process.env.NODE_ENV === 'production');

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524393373203_2073';

  config.mongoose = {
    url: process.env.DB_URL || 'mongodb://127.0.0.1/nicemall',
    options: {},
  };

  config.security = {
    domainWhiteList: [ Domain ], // .domain.com 安全白名单，以 . 开头
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: function corsOrigin(ctx) {
      const origin = ctx.get('origin');
      const hostname = url.parse(origin).hostname;
      if (ctx.isSafeDomain(hostname)) {
        return origin;
      }
      return '';
    },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: isDebug,
    // graphQL 路由前的拦截器
    // * onPreGraphQL(ctx) {
    //   console.log(ctx);
    // },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    // * onPreGraphiQL(ctx) {},
  };

  // add your config here
  config.middleware = [
    'errorHandler',
    'graphql',
  ];

  config.multipart = {
    fileSize: '10mb',
  };

  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '10mb',
    jsonLimit: '10mb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: [ 'json', 'form', 'text' ],
    extendTypes: {
      text: [ 'text/xml', 'application/xml' ],
    },
  };

  return config;
};
