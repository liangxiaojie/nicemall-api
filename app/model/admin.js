'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema({
    username: String,
    password: String,
    roles: Array,
    last_login_at: Date,
    created_at: Date,
    updated_at: Date,
  });

  return mongoose.model('Admin', AdminSchema);
};
