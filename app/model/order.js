'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OrderSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    pay_type: Number,
    pay_status: Number,
    status: Number,
    created_time: Date,
    pay_time: Date,
    send_time: Date,
    finish_time: Date,
  });

  return mongoose.model('Order', OrderSchema);
};
