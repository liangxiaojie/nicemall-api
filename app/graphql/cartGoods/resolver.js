'use strict';

module.exports = {
  Query: {
    cartGoodses(root, { user_id }, ctx) {
      return ctx.connector.cartGoods.fetchByUserId(user_id);
    },
  },
  Mutation: {
    addCartGoods(root, { input }, ctx) {
      return ctx.connector.cartGoods.create(input);
    },
    updateCartGoods(root, { _id, input }, ctx) {
      return ctx.connector.cartGoods.update(_id, input);
    },
    deleteCartGoods(root, { _id }, ctx) {
      return ctx.connector.cartGoods.delete(_id);
    },
  },
};
