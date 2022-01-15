'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      password: STRING(32),
      phone: STRING(105),
      avator_url: STRING(100),
      create_time: DATE,
      update_time: DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user');
  },
};
