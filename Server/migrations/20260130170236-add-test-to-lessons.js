'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Lessons', 'test', {
      type: Sequelize.ENUM('да', 'нет'),
      allowNull: false,
      defaultValue: 'нет'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lessons', 'test');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Lessons_test";'
    );
  }
};