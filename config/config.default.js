/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642227292130_8242';
  config.security = {
    csrf: {
      ignore: ctx => {
        if ([].includes(ctx.request.url)) {
          return true;
        }
        return false;
      },
    },
  };
  config.session = {
    key: 'auth_session',
    maxAge: 4 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    maxAge: 0,
    buffer: false,
  };
  //  模板渲染
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };
  // 文件上传
  config.multipart = {
    // mode: 'file',
    tmpdir: path.join(appInfo.baseDir, 'app/public/temp'),
    fields: '100', // 默认表单提交得长度为10
  };
  // token密钥
  config.jwt = {
    cert: 'huanggegehaoshuai', // jwt秘钥
  };
  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  // sequelize管理mysql数据库
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'eggweb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    define: {
      timestamps: false, // 禁止自动创建 created_at和updated_at
      freezeTableName: true, // 禁止转换为复数
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
