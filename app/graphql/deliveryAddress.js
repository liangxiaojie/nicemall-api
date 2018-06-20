'use strict';

exports.resolver = {
  Query: {
    deliveryAddresses(root, { query, skip, first }, ctx) {
      return ctx.service.deliveryAddress.fetch(query, first, skip);
    },
  },
  Mutation: {
    addDeliveryAddress(root, { input }, ctx) {
      return ctx.service.deliveryAddress.create(input);
    },
    updateDeliveryAddress(root, { _id, input }, ctx) {
      return ctx.service.deliveryAddress.update(_id, input);
    },
    deleteDeliveryAddress(root, { _id }, ctx) {
      return ctx.service.deliveryAddress.delete(_id);
    },
  },
};
