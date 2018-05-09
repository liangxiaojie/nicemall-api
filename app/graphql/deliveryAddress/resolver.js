'use strict';

module.exports = {
  Query: {
    deliveryAddresses(root, { query, skip, first }, ctx) {
      return ctx.connector.deliveryAddress.fetch(query, first, skip);
    },
  },
  Mutation: {
    addDeliveryAddress(root, { input }, ctx) {
      return ctx.connector.deliveryAddress.create(input);
    },
    updateDeliveryAddress(root, { _id, input }, ctx) {
      return ctx.connector.deliveryAddress.update(_id, input);
    },
    deleteDeliveryAddress(root, { _id }, ctx) {
      return ctx.connector.deliveryAddress.delete(_id);
    },
  },
};
