'use strict';

module.exports = {
  Query: {
    goodses(root, { query, skip, first, sortBy }, ctx) {
      return ctx.connector.goods.fetch(query, first, skip, sortBy);
    },
    goods(root, { _id }, ctx) {
      return ctx.connector.goods.fetchById(_id);
    },
  },
  Mutation: {
    createGoods(root, { input }, ctx) {
      return ctx.connector.goods.create(input);
    },
    updateGoods(root, { _id, input }, ctx) {
      return ctx.connector.goods.update(_id, input);
    },
    deleteGoods(root, { _id }, ctx) {
      return ctx.connector.goods.delete(_id);
    },
  },
};
