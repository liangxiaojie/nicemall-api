'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsSchema = new Schema({
    imgSrc: String,
    title: String,
    discription: String,
    price: Number,
    priceOld: Number,
    sales: Number,
    created: Date,
    updated: Date,
  });

  return mongoose.model('Goods', GoodsSchema);
};
