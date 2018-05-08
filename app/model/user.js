'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    wechat_number: String,
    nickname: String,
    avatar: String,
    realname: String,
    username: String,
    password: String,
    sex: Number,
    country: String,
    city: String,
    credit_score: Number,
    last_login_at: Date,
    created_at: Date,
    updated_at: Date,
  });

  return mongoose.model('User', UserSchema);
};
