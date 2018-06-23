'use strict';

module.exports = app => {
  // 序列化用户信息
  app.passport.serializeUser((ctx, user) => ({ id: user._id, type: user.type }));

  // 反序列化用户信息
  app.passport.deserializeUser(async (ctx, { id, type }) => {
    let user;
    if (type === 'admin') {
      user = await ctx.service.admin.getUserById(id);
    } else {
      user = await ctx.service.wxUser.getWxUserById(id);
    }
    return user;
  });
};
