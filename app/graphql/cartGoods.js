'use strict';

module.exports = {
  Query: {
    cartGoodses(root, { user_id }, ctx) {
      return ctx.service.cartGoods.fetchByUserId(user_id);
    },
  },
  Mutation: {
    addCartGoods(root, { input }, ctx) {
      return ctx.service.cartGoods.create(input);
    },
    updateCartGoods(root, { _id, input }, ctx) {
      return ctx.service.cartGoods.update(_id, input);
    },
    deleteCartGoods(root, { _id }, ctx) {
      return ctx.service.cartGoods.delete(_id);
    },
  },
};
