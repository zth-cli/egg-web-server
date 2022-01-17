'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @description 用于配置 URL 路由规则
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/findAllArticle', controller.home.findUser);
  router.get('/article/:id', controller.home.findArticle); // 根据文章ID查看文章
  router.get('/tag/:id', controller.home.findArticleByTagId); // 根据标签ID查看文章列表
  router.get('/classify', controller.home.findTags); // 标签统计

  // admin
  router.get('/admin', controller.admin.index); // 标签统计
  router.post('/admin/addArticle', controller.admin.addArticle);
  router.get('/admin/getAllTags', controller.admin.getAllTags);
  router.post('/admin/uploadFile', controller.admin.uploadFile);
};
