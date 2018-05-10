'use strict';

module.exports = {
  Query: {
    gallerys(root, params, ctx) {
      return ctx.connector.gallery.fetch();
    },
  },
  Mutation: {
    createGallery(root, { input }, ctx) {
      return ctx.connector.gallery.create(input);
    },
    updateGallery(root, { _id, input }, ctx) {
      return ctx.connector.gallery.update(_id, input);
    },
    deleteGallery(root, { _id }, ctx) {
      return ctx.connector.gallery.delete(_id);
    },
  },
};
