'use strict';

module.exports = {
  Query: {
    orders(root, { query, skip, first }, ctx) {
      return ctx.connector.order.fetch(query, first, skip);
    },
    order(root, { _id }, ctx) {
      return ctx.connector.order.fetchById(_id);
    },
  },
  Mutation: {
    createOrder(root, { input }, ctx) {
      return ctx.connector.order.create(input);
    },
    updateOrder(root, { _id, input }, ctx) {
      return ctx.connector.order.update(_id, input);
    },
    deleteOrder(root, { _id }, ctx) {
      return ctx.connector.order.delete(_id);
    },
  },
};
