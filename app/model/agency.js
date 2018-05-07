'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AgencySchema = new Schema({
    user_id: Schema.Types.ObjectId,
    name: String,
    phone: String,
    email: String,
    address: {
      country: String,
      province: String,
      city: String,
      area: String,
      full_address: String,
    },
    created_at: Date,
    updated_at: Date,
  });

  return mongoose.model('Agency', AgencySchema);
};
