'use strict';

module.exports = app => {
  // 序列化用户信息
  app.passport.serializeUser((ctx, user) => ({ id: user._id }));

  // 反序列化用户信息
  app.passport.deserializeUser(async (ctx, { id }) => {
    const user = await ctx.service.wxUser.getWxUserById(id);
    return user;
  });
};
