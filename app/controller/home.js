'use strict';

const Controller = require('./baseController.js');


/**
 * @description Controller目录 用于解析用户的输入，处理后返回相应的结果
 */

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { count, rows } = await await ctx.service.home.index();

    await ctx.render('/home/index', {
      title: 'Hello Koa 211!',
      token: ctx.cookies.get('token'),
      data: rows,
      total: count,
      pageIndex: 1,
      pageNum: 1,
    });
  }
  async findArticle() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = await ctx.model.Article.findByPk(id);
    await ctx.render('home/article', {
      list: data,
    });
  }
  async findArticleByTagId() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = await ctx.service.home.findArticleByTagId(id);
    await ctx.render('home/tags', {
      typeStr: data.title,
      list: data.articles,
    });
  }
  async findUser() {
    const { ctx } = this;
    const data = await ctx.service.home.index();
    await this.success(data, '查询成功');
    // await this.error(data, '查询失败');
  }
}

module.exports = HomeController;
