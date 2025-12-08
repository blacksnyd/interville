'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: "Roles",
        key: "id",
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      references: {
        model: "Roles",
        key: "id",
      }
    });
  }
};
