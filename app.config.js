'use strict';
const Domain = process.env.Domain || 'localhost';
const API_URL = process.env.API_URL || 'http://localhost:7001';
const WWW_URL = process.env.WWW_URL || 'http://localhost:3000';

const wxConfig = {
  appid: 'wx24b0ef466d9be3dd',
  secret: '76137c8f7249bfe54a1935adae67c5bf',
  token: 'asdhfsjsjkdfjkjjjkj',
  mch_id: '1491189112',
  api_key: '875436469c6c022f7dc01edcf69f6c2u',
};

module.exports = {
  Domain,
  API_URL,
  WWW_URL,
  wxConfig,
};
