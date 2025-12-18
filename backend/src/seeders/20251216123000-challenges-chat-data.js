'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Challenges de test
    await queryInterface.bulkInsert(
      'challenges',
      [
        {
          id: 1,
          title: 'Créer un algorithme de tri optimal',
          description:
            "Développez un algorithme de tri performant et comparez-le avec ceux des autres participants.",
          category: 'CODE',
          city_id: 1,
          creator_id: 1, // admin
          status: 'open',
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          title: 'Course de 5km en moins de 30 min',
          description:
            'Relevez ce défi sportif et partagez votre temps avec la communauté.',
          category: 'SPORT',
          city_id: 3,
          creator_id: 2,
          status: 'open',
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          title: 'Préparer un plat traditionnel de sa région',
          description:
            'Cuisinez un plat typique de votre région et partagez la recette.',
          category: 'CUISINE',
          city_id: 2,
          creator_id: 2,
          status: 'open',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );

    // Participations
    await queryInterface.bulkInsert(
      'challenge_participations',
      [
        {
          id: 1,
          user_id: 2,
          challenge_id: 1,
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          user_id: 3,
          challenge_id: 1,
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          user_id: 2,
          challenge_id: 2,
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );

    // Commentaires
    await queryInterface.bulkInsert(
      'challenge_comments',
      [
        {
          id: 1,
          user_id: 2,
          challenge_id: 1,
          content:
            "Je recommande de commencer par comparer la complexité avec les algorithmes classiques.",
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          user_id: 3,
          challenge_id: 1,
          content:
            'Pensez aussi à tester sur de très grands tableaux pour voir le comportement en pratique.',
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          user_id: 2,
          challenge_id: 2,
          content:
            'Astuce pour la course : partir lentement et accélérer progressivement sur les 2 derniers kilomètres.',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );

    // Messages de chat
    await queryInterface.bulkInsert(
      'chat_messages',
      [
        {
          id: 1,
          user_id: 2,
          content:
            "Salut tout le monde ! Quelqu'un a des conseils pour le challenge de course ?",
          created_at: now,
          updated_at: now,
        },
        {
          id: 2,
          user_id: 3,
          content:
            'Oui ! Je te conseille de commencer doucement et d’augmenter progressivement.',
          created_at: now,
          updated_at: now,
        },
        {
          id: 3,
          user_id: 2,
          content:
            "Je suis d’accord, l’important c’est la régularité. On pourrait organiser une sortie running ?",
          created_at: now,
          updated_at: now,
        },
        {
          id: 4,
          user_id: 4,
          content:
            'Des volontaires pour un groupe de travail sur le challenge de code ?',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chat_messages', null, {});
    await queryInterface.bulkDelete('challenge_comments', null, {});
    await queryInterface.bulkDelete('challenge_participations', null, {});
    await queryInterface.bulkDelete('challenges', null, {});
  },
};


