'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    item_id: Number,
    content: String,
  });

  return mongoose.model('Tag', UserSchema);
};
