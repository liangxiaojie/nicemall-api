'use strict';

const request = require('request-promise-native');
const { wxConfig } = require('../app.config');

let access_token;
let expires_in = 7200;
let lastFetchDate;

async function getAccessToken() {
  if (!lastFetchDate || (Date.now() - lastFetchDate) / 1000 >= (expires_in - 100)) {
    const res = await request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appid}&secret=${wxConfig.secret}`);
    const data = JSON.parse(res);
    access_token = data.access_token;
    expires_in = data.expires_in;
    lastFetchDate = Date.now();
  }
  return access_token;
}

module.exports = {
  getAccessToken,
};
