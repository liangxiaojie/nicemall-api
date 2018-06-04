'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
const { API_URL } = require('../../app.config');

class UploadAjaxController extends Controller {
  async upload() {
    const stream = await this.ctx.getFileStream();
    const file = path.parse(stream.filename);
    const filename = encodeURIComponent(file.name) + '_' + md5(stream) + file.ext.toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    this.ctx.body = { url: `${API_URL}/public/uploads/${filename}` };
  }
}

module.exports = UploadAjaxController;
