'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.graphql = {
  enable: true,
  package: 'egg-graphql-apollo',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.session = true;
