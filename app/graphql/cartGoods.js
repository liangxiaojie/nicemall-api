'use strict';

module.exports = {
  Query: {
    cartGoodses(root, params, ctx) {
      return ctx.service.cartGoods.fetchByUserId(ctx.user._id);
    },
  },
  Mutation: {
    createCartGoods(root, { input }, ctx) {
      return ctx.service.cartGoods.create(ctx.user._id, input);
    },
    updateCartGoods(root, { _id, input }, ctx) {
      return ctx.service.cartGoods.update(_id, input);
    },
    deleteCartGoods(root, { _id }, ctx) {
      return ctx.service.cartGoods.delete(_id);
    },
  },
};
