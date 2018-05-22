'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  app.post('/api/auth/wxLogin', controller.auth.wxLogin);
  app.post('/api/auth/login', controller.auth.login);
  app.post('/api/auth/register', controller.auth.register);
  app.resources('users', '/api/users', controller.user);
};
