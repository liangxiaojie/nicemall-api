'use strict';

exports.resolver = {
  Query: {
    goodses(root, { query, skip, first, sortBy }, ctx) {
      return ctx.service.goods.fetch(query, first, skip, sortBy);
    },
    goods(root, { _id }, ctx) {
      return ctx.service.goods.fetchById(_id);
    },
  },
  Mutation: {
    createGoods(root, { input }, ctx) {
      return ctx.service.goods.create(input);
    },
    updateGoods(root, { _id, input }, ctx) {
      return ctx.service.goods.update(_id, input);
    },
    deleteGoods(root, { _id }, ctx) {
      return ctx.service.goods.delete(_id);
    },
  },
};
