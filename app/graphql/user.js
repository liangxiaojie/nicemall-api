'use strict';

exports.resolver = {
  Query: {
    profile(obj, args, ctx) {
      return ctx.service.wxUser.getWxUserById(ctx.user.id);
    },
    users(root, params, ctx) {
      return ctx.service.wxUser.fetch();
    },
  },
};
