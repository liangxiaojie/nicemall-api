'use strict';

module.exports = {
  Query: {
    goodses(root, params, ctx) {
      return ctx.connector.goods.fetch(params);
    },
    goods(root, { _id }, ctx) {
      return ctx.connector.goods.fetchById(_id);
    },
  },
  Mutation: {
    createGoods(root, {
      imgSrc,
      title,
      discription,
      price,
      priceOld,
      sales,
    }, ctx) {
      return ctx.connector.goods.create(imgSrc, title, discription, price, priceOld, sales);
    },
    updateGoods(root, {
      _id,
      imgSrc,
      title,
      discription,
      price,
      priceOld,
      sales,
    }, ctx) {
      return ctx.connector.goods.update(_id, imgSrc, title, discription, price, priceOld, sales);
    },
    deleteGoods(root, {
      _id,
    }, ctx) {
      return ctx.connector.goods.delete(_id);
    },
  },
};
