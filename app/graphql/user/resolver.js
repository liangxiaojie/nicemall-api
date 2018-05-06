'use strict';

module.exports = {
  Query: {
    user(root, { _id }, ctx) {
      return ctx.connector.user.fetchById(_id);
    },
  },
};
