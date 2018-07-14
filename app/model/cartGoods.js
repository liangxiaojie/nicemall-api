'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CartGoodsSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    goods: {
      type: Schema.Types.ObjectId,
      ref: 'Goods',
    },
    number: Number,
    spec: Array,
    created_time: Date,
    updated_time: Date,
  });

  return mongoose.model('CartGoods', CartGoodsSchema);
};
