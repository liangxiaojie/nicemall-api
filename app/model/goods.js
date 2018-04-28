'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsSchema = new Schema({
    imgSrc: String,
    title: String,
    discription: String,
    price: String,
    priceOld: String,
    sales: String,
  });

  return mongoose.model('Goods', GoodsSchema);
};
