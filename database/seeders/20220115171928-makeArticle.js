'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('article', [{
      content: '<h1>这是文章内容</h1>',
      title: '基于eggjs的node服务器一个开箱即用的应用模板',
      invisible: 1,
      tags: 'node,javascript',
      create_time: '2022-01-15',
      update_time: '2022-01-15',
      detail: '基于eggjs的node服务器一个开箱即用的应用模板',
      author: 'rzx',
      url: '/details',
      pv: 1,
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('article', null, {});
  },
};
