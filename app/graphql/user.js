'use strict';

exports.resolver = {
  Query: {
    async wxUserinfo(obj, { code }, ctx) {
      let user;

      if (ctx.user) {
        user = ctx.user;
      } else if (code) {
        user = await ctx.service.wxUser.getWxUserByCode(code);
        ctx.login(user);
      } else if (process.env.NODE_ENV === 'development') {
        user = await ctx.service.wxUser.getWxUserById('5b2e0dc92d2b644a6c18ed7e');
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
