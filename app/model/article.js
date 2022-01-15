// app/model/user.js
'use strict';
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    content: STRING,
    title: STRING,
    invisible: INTEGER,
    tags: STRING(100),
    create_time: DATE,
    update_time: DATE,
    detail: STRING,
    author: STRING(20),
    url: STRING(40),
    pv: INTEGER,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  // Article.sync(); // 创建表
  return Article;
};
/*  Now you can use it in your controller:
 const users = await this.ctx.model.Article.findAll(); */
