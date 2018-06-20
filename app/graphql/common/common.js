'use strict';

exports.resolver = {
  Date: require('./scalars/date'),
};

exports.schemaDirective = {
  auth: require('./visitors/auth_directive'),
};
