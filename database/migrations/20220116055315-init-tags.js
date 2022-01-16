'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('tags', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(30),
      type_id: INTEGER,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tags');
  },
};
