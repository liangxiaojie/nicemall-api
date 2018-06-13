'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsSchema = new Schema({
    name: String,
    discription: String,
    type: Number,
    imgSrc: String,
    images: Array,
    price: Number,
    priceOld: Number,
    store_nums: Number,
    sales: Number,
    mark: Number,
    status: Number,
    up_time: Date,
    down_time: Date,
    attrs: Array,
    spec_id: Schema.Types.ObjectId,
    logistics_id: Schema.Types.ObjectId,
    created_time: Date,
    updated_time: Date,
  });

  return mongoose.model('Goods', GoodsSchema);
};
