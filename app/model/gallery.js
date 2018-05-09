'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GallerySchema = new Schema({
    imgSrc: String,
    linkUrl: String,
    order: Number,
    created_time: Date,
    updated_time: Date,
  });

  return mongoose.model('Gallery', GallerySchema);
};
