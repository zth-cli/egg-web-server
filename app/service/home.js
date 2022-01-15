'use strict';

const Service = require('egg').Service;


/**
 * @description Service 用于编写业务逻辑层，可选，建议使用，
 */

class HomeService extends Service {
  async index() {
    const { ctx } = this;
    return ctx.url;
  }
}

module.exports = HomeService;
