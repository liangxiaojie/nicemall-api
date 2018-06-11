'use strict';

module.exports = {
  Query: {
    users(root, params, ctx) {
      return ctx.connector.user.fetch();
    },
  },
};
