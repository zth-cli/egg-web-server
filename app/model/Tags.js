'use strict';
module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const Tags = app.model.define('tags', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(30),
    type_id: INTEGER,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  // Tags.sync(); // 创建表
  return Tags;
};
/*  Now you can use it in your controller:
 const tags = await this.ctx.model.Tags.findAll(); */
