'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('user', [{
      username: 'admin',
      phone: '15623476282',
      password: '12345',
      avator_url: '/',
      create_time: '2022-01-15',
      update_time: '2022-01-15',
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
