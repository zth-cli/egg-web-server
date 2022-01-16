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
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      headerName: 'x-csrf-tokens', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      // useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      cookieName: 'csrfTokens', // Cookie 中的字段名，默认为 csrfToken
      // sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
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
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  config.middleware = ['errorHandler'];
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
      underscored: true, // 禁止自动驼峰
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
