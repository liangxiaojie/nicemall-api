'use strict';

exports.resolver = {
  Query: {
    orders(root, { query, skip, first }, ctx) {
      return ctx.service.order.fetch(query, first, skip);
    },
    order(root, { _id }, ctx) {
      return ctx.service.order.fetchById(_id);
    },
  },
  Mutation: {
    createOrder(root, { input }, ctx) {
      return ctx.service.order.create(input);
    },
    updateOrder(root, { _id, input }, ctx) {
      return ctx.service.order.update(_id, input);
    },
    deleteOrder(root, { _id }, ctx) {
      return ctx.service.order.delete(_id);
    },
  },
};
