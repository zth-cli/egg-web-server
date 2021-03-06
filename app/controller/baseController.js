// 父类

'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
  async success(data = null, message = '操作成功！') {
    this.ctx.body = {
      errno: 0,
      data,
      msg: message,
    };
  }

  async error(data = null, message = '操作失败:发生未知异常！') {
    this.ctx.body = {
      errno: 1,
      data,
      msg: message,
    };
  }
  // 封装一个删除方法
  async delete() {
    /*
      1、获取要删除的数据库表   model
      2、获取要删除数据的id   _id
      3、执行删除
      4、返回到以前的页面           ctx.request.headers['referer']   (上一页的地址)
      */
    const prevPage = this.ctx.request.headers.referer;
    const model = this.ctx.request.query.model; // Role
    const id = this.ctx.request.query.id;
    await this.ctx.model[model].deleteOne({ _id: id }); // 注意写法
    this.ctx.redirect(prevPage);
  }
  // 公共更改数据状态(status)
  async changeStatus() {
    const { ctx } = this;
    const { model, attr, id, value } = ctx.query;
    const result = await this.ctx.model[model].find({ _id: id });
    if (result.length > 0) {
      let json = {};
      if (result[0][attr] === 1) {
        json = { [attr]: 0 };
      } else {
        json = { [attr]: 1 };
      }
      // 执行更新操作
      const updateResult = await this.ctx.model[model].updateOne({ _id: id }, json);
      if (updateResult) {
        ctx.helper.success({ ctx, msg: '状态修改成功' });
      } else {
        ctx.helper.error({ ctx, msg: '状态修改失败' });
      }
    } else {
      ctx.helper.error({ ctx, msg: '更新失败,参数错误' });
    }
  }
  // 公共改变数据值(number),如数据得价格，排序权重等
  async editNum() {
    const { ctx } = this;
    const { model, attr, id, num } = ctx.query;
    const result = await this.ctx.model[model].find({ _id: id });
    if (result.length > 0) {
      const row = await this.ctx.model[model].updateOne({ _id: id }, { [attr]: num });
      if (row) {
        ctx.helper.success({ ctx, msg: '更新成功' });
      } else {
        ctx.helper.error({ ctx, msg: '更新失败' });
      }
    } else {
      ctx.helper.error({ ctx, msg: '更新失败' });
    }
  }
}

module.exports = BaseController;
