// migrations/xxxx-add-type-to-questions.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Questions', 'type', {
      type: Sequelize.ENUM('single', 'multiple', 'text'),
      allowNull: false,
      defaultValue: 'single',
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Questions', 'type')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Questions_type";'
    )
  }
}