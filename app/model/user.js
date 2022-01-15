// app/model/user.js
'use strict';
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(32),
    phone: STRING(105),
    avator_url: STRING(100),
    create_time: DATE,
    update_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  // User.sync(); // 创建表
  return User;
};
/*  Now you can use it in your controller:
 const users = await this.ctx.model.User.findAll(); */
