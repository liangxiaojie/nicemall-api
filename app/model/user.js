'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    openid: String,
    nickname: String,
    sex: String,
    province: String,
    city: String,
    country: String,
    headimgurl: String,
    privilege: Array,
    unionid: String,
    created_at: {
      type: Date,
      default: Date.now(),
    },
    credit_score: Number,
  });

  return mongoose.model('User', UserSchema);
};
