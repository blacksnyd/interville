'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Cities', 'cities');
    await queryInterface.renameColumn('cities', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cities', 'updatedAt', 'updated_at');

    await queryInterface.renameTable('Classes', 'classes');
    await queryInterface.renameColumn('classes', 'createdAt', 'created_at');
    await queryInterface.renameColumn('classes', 'updatedAt', 'updated_at');

    await queryInterface.renameTable('Roles', 'roles');
    await queryInterface.renameColumn('roles', 'createdAt', 'created_at');
    await queryInterface.renameColumn('roles', 'updatedAt', 'updated_at');

    await queryInterface.renameTable('Users', 'users');
    await queryInterface.renameColumn('users', 'createdAt', 'created_at');
    await queryInterface.renameColumn('users', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('users', 'cityId', 'city_id');
    await queryInterface.renameColumn('users', 'roleId', 'role_id');
    await queryInterface.renameColumn('users', 'classId', 'class_id');
  },

  async down(queryInterface, Sequelize) {
    // Revenir en arrière : snake_case → PascalCase / camelCase
    await queryInterface.renameColumn('users', 'class_id', 'classId');
    await queryInterface.renameColumn('users', 'role_id', 'roleId');
    await queryInterface.renameColumn('users', 'city_id', 'cityId');
    await queryInterface.renameColumn('users', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('users', 'created_at', 'createdAt');
    await queryInterface.renameTable('users', 'Users');

    await queryInterface.renameColumn('roles', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('roles', 'created_at', 'createdAt');
    await queryInterface.renameTable('roles', 'Roles');

    await queryInterface.renameColumn('classes', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('classes', 'created_at', 'createdAt');
    await queryInterface.renameTable('classes', 'Classes');

    await queryInterface.renameColumn('cities', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('cities', 'created_at', 'createdAt');
    await queryInterface.renameTable('cities', 'Cities');
  }
};
