'use strict';

const Controller = require('./baseController.js');


/**
 * @description Controller目录 用于解析用户的输入，处理后返回相应的结果
 */

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    const { count, rows } = await await ctx.service.home.index();
    console.log(ctx.csrf);
    await ctx.render('/admin/index', {
      title: 'egg 2022!',
      token: ctx.csrf,
      data: rows,
      total: count,
      pageIndex: 1,
      pageNum: 1,
    });
  }
  async addArticle() {
    const { ctx } = this;
    const bodyParams = ctx.request.body;
    console.log(bodyParams);
    const data = await ctx.model.Article.create({ ...bodyParams, ...{ create_time: ctx.helper.formatTime(), update_time: ctx.helper.formatTime() } });
    const article_id = data.id;
    const tagArr = bodyParams.tags.split(',');
    const artTotag = tagArr.map(item => {
      return { tag_id: item, article_id };
    });
    await ctx.model.ArtcileToTags.bulkCreate(artTotag);
    await this.success(data, '上传成功');
  }
  async getAllTags() {
    const { ctx } = this;
    const data = await ctx.model.Tags.findAll();
    await this.success(data);
  }
  async uploadFile() {
    const { ctx, app } = this;
    const { filepathArr } = await ctx.helper.uploadStream(app, ctx);
    if (filepathArr.length > 0) {
      await this.success({
        url: filepathArr[0],
      }, '上传成功');
    } else {
      await this.error(null, '失败');
    }
  }
}

module.exports = AdminController;
