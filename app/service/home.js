'use strict';

const Service = require('egg').Service;


/**
 * @description Service 用于编写业务逻辑层，可选，建议使用，
 */

class HomeService extends Service {
  //  查询文章列表
  async index() {
    const blogModel = this.ctx.model.Article;
    const typeModel = this.ctx.model.Tags;
    blogModel.belongsToMany(typeModel, { through: this.ctx.model.ArtcileToTags });
    // typeModel.belongsToMany(blogModel, { through: this.ctx.model.ArtcileToTags });
    const result = await blogModel.findAndCountAll({
      include: [{ model: typeModel, attributes: [ 'title', 'id' ] }],
    });
    return result;
  }
  //  根据tagid查询所有相关联文章
  async findArticleByTagId(tagId) {
    // [ this.ctx.model.fn('COUNT', this.ctx.model.col('title')), 'n_hats' ],
    const blogModel = this.ctx.model.Article;
    const typeModel = this.ctx.model.Tags;
    await blogModel.update({ pv: this.ctx.model.literal('`pv` + 1') }, { where: { id: tagId } });
    typeModel.belongsToMany(blogModel, { through: this.ctx.model.ArtcileToTags });
    const result = await typeModel.findOne({
      where: { id: tagId },
      include: [{ model: blogModel, attributes: [ 'title', 'id' ] }],
    });
    return result;
  }
  //  根据标签统计
  async findTags() {
    const ArtcileToTags = this.ctx.model.ArtcileToTags;
    const typeModel = this.ctx.model.Tags;
    typeModel.hasMany(ArtcileToTags);
    ArtcileToTags.belongsTo(typeModel);
    const result = await ArtcileToTags.findAll({
      foreignKey: 'tag_id',
      include: [{ model: typeModel, attributes: [[ 'title', 'name' ], 'id' ] }],
      attributes: [[ this.ctx.model.fn('COUNT', this.ctx.model.col('tag_id')), 'article_num' ]],
      group: 'tag_id',
      raw: true,

    });
    return result;
  }
}

module.exports = HomeService;

// 在Sequelize中使用group by分组聚合查询
// https://itbilu.com/nodejs/npm/EJcKjQWfM.html
