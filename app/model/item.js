'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    content: String,
    expire: Date,
    priority: { type: Number, default: 0 },
    done: { type: Boolean, default: false },
  });

  return mongoose.model('Item', UserSchema);
};
