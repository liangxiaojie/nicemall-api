'use strict';

module.exports = {
  Query: {
    gallerys(root, params, ctx) {
      return ctx.connector.gallery.fetch();
    },
  },
  Mutation: {
    createOrder(root, { input }, ctx) {
      return ctx.connector.gallery.create(input);
    },
    updateOrder(root, { _id, input }, ctx) {
      return ctx.connector.gallery.update(_id, input);
    },
    deleteOrder(root, { _id }, ctx) {
      return ctx.connector.gallery.delete(_id);
    },
  },
};
