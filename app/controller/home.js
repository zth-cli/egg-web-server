'use strict';

const Controller = require('./baseController.js');


/**
 * @description Controller目录 用于解析用户的输入，处理后返回相应的结果
 */

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Article.findAll();
    const { count } = await ctx.model.Article.findAndCountAll();

    await ctx.render('/home/index', {
      title: 'Hello Koa 211!',
      token: ctx.cookies.get('token'),
      data,
      total: count,
      pageIndex: 1,
      pageNum: 1,
    });
  }
  async findUser() {
    const { ctx } = this;
    const data = await ctx.model.User.findAll();
    await this.success(data, '查询成功');
    // await this.error(data, '查询失败');
  }
}

module.exports = HomeController;
