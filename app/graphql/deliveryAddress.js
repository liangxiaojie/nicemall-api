'use strict';

exports.resolver = {
  Query: {
    deliveryAddresses(root, { query = {}, skip, first }, ctx) {
      // query.user_id = ctx.user._id;
      return ctx.service.deliveryAddress.fetch(query, first, skip);
    },
  },
  Mutation: {
    createDeliveryAddress(root, { input }, ctx) {
      return ctx.service.deliveryAddress.create('5ae319d3bebda81d63b17de6' || ctx.user._id, input);
    },
    updateDeliveryAddress(root, { _id, input }, ctx) {
      return ctx.service.deliveryAddress.update(_id, input);
    },
    deleteDeliveryAddress(root, { _id }, ctx) {
      return ctx.service.deliveryAddress.delete(_id);
    },
  },
};
