'use strict';
const Domain = process.env.Domain || 'localhost';
const API_URL = process.env.API_URL || 'http://localhost:7001';

module.exports = {
  Domain,
  API_URL,
};
