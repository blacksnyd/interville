'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Utilitaire pour renommer sécuritairement
    const safeRename = async (table, from, to) => {
      const desc = await queryInterface.describeTable(table);
      if (desc[from]) {
        await queryInterface.renameColumn(table, from, to);
      }
    };

    // Cities
    await queryInterface.renameTable('Cities', 'cities');
    await safeRename('cities', 'createdAt', 'created_at');
    await safeRename('cities', 'updatedAt', 'updated_at');

    // Classes
    await queryInterface.renameTable('Classes', 'classes');
    await safeRename('classes', 'createdAt', 'created_at');
    await safeRename('classes', 'updatedAt', 'updated_at');

    // Roles
    await queryInterface.renameTable('Roles', 'roles');
    await safeRename('roles', 'createdAt', 'created_at');
    await safeRename('roles', 'updatedAt', 'updated_at');

    // Users
    await queryInterface.renameTable('Users', 'users');
    await safeRename('users', 'createdAt', 'created_at');
    await safeRename('users', 'updatedAt', 'updated_at');
    await safeRename('users', 'cityId', 'city_id');
    await safeRename('users', 'roleId', 'role_id');
    await safeRename('users', 'classId', 'class_id');
  },

  async down(queryInterface, Sequelize) {

    const safeRename = async (table, from, to) => {
      const desc = await queryInterface.describeTable(table);
      if (desc[from]) {
        await queryInterface.renameColumn(table, from, to);
      }
    };

    // Users
    await safeRename('users', 'class_id', 'classId');
    await safeRename('users', 'role_id', 'roleId');
    await safeRename('users', 'city_id', 'cityId');
    await safeRename('users', 'updated_at', 'updatedAt');
    await safeRename('users', 'created_at', 'createdAt');
    await queryInterface.renameTable('users', 'Users');

    // Roles
    await safeRename('roles', 'updated_at', 'updatedAt');
    await safeRename('roles', 'created_at', 'createdAt');
    await queryInterface.renameTable('roles', 'Roles');

    // Classes
    await safeRename('classes', 'updated_at', 'updatedAt');
    await safeRename('classes', 'created_at', 'createdAt');
    await queryInterface.renameTable('classes', 'Classes');

    // Cities
    await safeRename('cities', 'updated_at', 'updatedAt');
    await safeRename('cities', 'created_at', 'createdAt');
    await queryInterface.renameTable('cities', 'Cities');
  }
};
