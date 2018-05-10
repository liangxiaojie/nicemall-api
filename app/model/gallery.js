'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GallerySchema = new Schema({
    imgSrc: String,
    linkUrl: String,
    order: { type: Number, default: 0 },
    created_time: Date,
    updated_time: Date,
  });

  return mongoose.model('Gallery', GallerySchema);
};
