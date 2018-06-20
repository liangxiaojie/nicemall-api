'use strict';

exports.resolver = {
  Query: {
    wxUserinfo(obj, { code }, ctx) {
      let user;

      if (ctx.isAuthenticated() && ctx.user) {
        user = ctx.user;
      } else if (code) {
        user = ctx.service.wxUser.getWxUserByCode(code);
        ctx.login(user);
      }

      if (!user) {
        ctx.status = 401;
        throw new Error('Not logged in');
      }

      return user;
    },
    users(root, params, ctx) {
      return ctx.service.wxUser.fetch();
    },
  },
};
