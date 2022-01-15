'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('article', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      content: STRING,
      title: STRING,
      invisible: INTEGER,
      tags: STRING(100),
      create_time: DATE,
      update_time: DATE,
      detail: STRING,
      author: STRING(20),
      url: STRING(40),
      pv: INTEGER,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('article');
  },
};
