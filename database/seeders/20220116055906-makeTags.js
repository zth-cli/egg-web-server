'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tags', [{
      title: 'node',
    },
    {
      title: 'javascript',
    },
    {
      title: 'Vue',
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tags', null, {});
  },
};
