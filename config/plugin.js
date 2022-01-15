'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 开启静态资源代理
  static: {
    enable: true,
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
};
