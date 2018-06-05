'use strict';

const request = require('request-promise');
const { wxConfig } = require('../app.config');

let access_token;
let expires_in = 7200;
let lastFetchDate;

async function getAccessToken() {
  if (!lastFetchDate || (Date.now() - lastFetchDate) / 1000 >= (expires_in - 100)) {
    const res = await request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appid}&secret=${wxConfig.secret}`);
    access_token = res.access_token;
    expires_in = res.expires_in;
    lastFetchDate = Date.now();
    console.log('fetch access_token');
  }
  console.log(access_token);
  return access_token;
}

module.exports = {
  getAccessToken,
};
