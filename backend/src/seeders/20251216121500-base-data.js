'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Nettoyer les données existantes pour éviter les erreurs de validation (dev uniquement)
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('classes', null, {});
    await queryInterface.bulkDelete('cities', null, {});
    await queryInterface.bulkDelete('roles', null, {});

    // Roles de base
    await queryInterface.bulkInsert(
      'roles',
      [
        { id: 1, name: 'user', created_at: now, updated_at: now },
        { id: 2, name: 'admin', created_at: now, updated_at: now },
      ],
      {}
    );

    // Villes
    await queryInterface.bulkInsert(
      'cities',
      [
        { id: 1, name: 'Marseille', created_at: now, updated_at: now },
        { id: 2, name: 'Nice', created_at: now, updated_at: now },
        { id: 3, name: 'Aix-en-Provence', created_at: now, updated_at: now },
        { id: 4, name: 'Paris', created_at: now, updated_at: now },
      ],
      {}
    );

    // Promotions
    await queryInterface.bulkInsert(
      'classes',
      [
        { id: 1, name: 'Promo 2024', created_at: now, updated_at: now },
        { id: 2, name: 'Promo 2025', created_at: now, updated_at: now },
        { id: 3, name: 'Promo 2026', created_at: now, updated_at: now },
      ],
      {}
    );

    // Utilisateurs de test
    const passwordHash = await bcrypt.hash('Password123!', 10);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'admin',
          email: 'admin@laplateforme.io',
          password: passwordHash,
          city_id: 1,
          class_id: 1,
          role_id: 2, // admin
          is_verified: true,
          is_validated: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          username: 'user_verifie_valide',
          email: 'user1@laplateforme.io',
          password: passwordHash,
          city_id: 2,
          class_id: 2,
          role_id: 1,
          is_verified: true,
          is_validated: true,
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          username: 'user_non_verifie',
          email: 'user2@laplateforme.io',
          password: passwordHash,
          city_id: 3,
          class_id: 3,
          role_id: 1,
          is_verified: false,
          is_validated: false,
          created_at: now,
          updated_at: now,
        },
        {
          id: 4,
          username: 'user_verifie_non_valide',
          email: 'user3@laplateforme.io',
          password: passwordHash,
          city_id: 4,
          class_id: 1,
          role_id: 1,
          is_verified: true,
          is_validated: false,
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('classes', null, {});
    await queryInterface.bulkDelete('cities', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};


