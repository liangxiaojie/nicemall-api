'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.graphql = {
  enable: true,
  package: 'egg-graphql',
};

exports.validate = {
  package: 'egg-validate',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
