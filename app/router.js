'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @description 用于配置 URL 路由规则
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
