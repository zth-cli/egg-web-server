'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('comment', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      content: STRING,
      username: STRING(100),
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('comment');
  },
};
