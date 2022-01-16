'use strict';

const Service = require('egg').Service;


/**
 * @description Service 用于编写业务逻辑层，可选，建议使用，
 */

class HomeService extends Service {
  async index() {
    // console.log(this.ctx.model.fn);
    const blogModel = this.ctx.model.Article;
    const typeModel = this.ctx.model.Tags;
    // 下面是重点，blogModel的type_id，指向typeModel的id
    blogModel.belongsToMany(typeModel, { through: this.ctx.model.ArtcileToTags });
    typeModel.belongsToMany(blogModel, { through: this.ctx.model.ArtcileToTags });
    const result = await blogModel.findAndCountAll({
      include: [{ model: typeModel, attributes: [ 'title', 'id' ] }],
    });
    return result;
  }
  async findArticleByTagId(tagId) {
    // [ this.ctx.model.fn('COUNT', this.ctx.model.col('title')), 'n_hats' ],
    const blogModel = this.ctx.model.Article;
    const typeModel = this.ctx.model.Tags;
    // 下面是重点，blogModel的type_id，指向typeModel的id
    // blogModel.belongsToMany(typeModel, { through: this.ctx.model.ArtcileToTags });
    typeModel.belongsToMany(blogModel, { through: this.ctx.model.ArtcileToTags });
    const result = await typeModel.findOne({
      where: { id: tagId },
      include: [{ model: blogModel, attributes: [ 'title',  'id' ] }],
    });
    return result;
  }
}

module.exports = HomeService;
