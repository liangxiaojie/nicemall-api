'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const DeliveryAddressSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    goods_id: Schema.Types.ObjectId,
    number: Number,
    spec: Array,
    created_time: Date,
    updated_time: Date,
  });

  return mongoose.model('DeliveryAddress', DeliveryAddressSchema);
};
