'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.post('/api/auth/wxLogin', controller.auth.wxLogin);
  router.post('/api/auth/wxUserinfo', controller.auth.wxUserinfo);
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/logout', controller.auth.logout);
  router.get('/api/auth/userinfo', controller.auth.userinfo);

  router.resources('users', '/api/users', controller.user);

  router.post('/api/uploads', controller.upload.upload);

  router.get('/api/wx', controller.wx.index);
  router.post('/api/wx', controller.wx.message);
  router.get('/api/wx/createMenu', controller.wx.createMenu);

};
