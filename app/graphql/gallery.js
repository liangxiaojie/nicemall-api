'use strict';

exports.resolver = {
  Query: {
    gallerys(root, params, ctx) {
      return ctx.service.gallery.fetch();
    },
  },
  Mutation: {
    createGallery(root, { input }, ctx) {
      return ctx.service.gallery.create(input);
    },
    updateGallery(root, { _id, input }, ctx) {
      return ctx.service.gallery.update(_id, input);
    },
    deleteGallery(root, { _id }, ctx) {
      return ctx.service.gallery.delete(_id);
    },
  },
};
