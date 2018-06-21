'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const DeliveryAddressSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    consignee: String,
    phone_number: String,
    address: String,
    is_default: Boolean,
    created_time: Date,
    updated_time: Date,
  });

  return mongoose.model('DeliveryAddress', DeliveryAddressSchema);
};
