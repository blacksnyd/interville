'use strict';

const { Op, fn, col } = require('sequelize');
const {
  User,
  Challenge,
  ChallengeParticipation,
  ChallengeComment,
  City,
} = require('../models');

/**
 * Statistiques globales pour le Dashboard
 */
exports.stats = async (req, res) => {
  try {
    // Nombre de challenges actifs
    const activeChallenges = await Challenge.count({
      where: { status: 'open' },
    });

    // Nombre d'utilisateurs "participants" (comptés comme vérifiés + validés)
    const totalParticipants = await User.count({
      where: {
        is_verified: true,
        is_validated: true,
      },
    });

    // Nombre total de commentaires
    const totalComments = await ChallengeComment.count();

    // Taux de participation approximatif : nb participants / nb users * 100
    const totalUsers = await User.count();
    const participationRate =
      totalUsers > 0
        ? Math.round((totalParticipants / totalUsers) * 100)
        : 0;

    // Derniers challenges
    const latestChallengesData = await Challenge.findAll({
      include: [
        { model: User, as: 'creator', attributes: ['id', 'username'] },
        { model: City, as: 'city', attributes: ['id', 'name'] },
        { model: ChallengeParticipation, as: 'participations', attributes: ['id'] },
        { model: ChallengeComment, as: 'comments', attributes: ['id'] },
      ],
      order: [['created_at', 'DESC']],
      limit: 5,
    });

    const latestChallenges = latestChallengesData.map((challenge) => ({
      id: challenge.id,
      category: challenge.category,
      title: challenge.title,
      author: challenge.creator ? challenge.creator.username : 'Anonyme',
      location: challenge.city ? challenge.city.name : 'Non renseignée',
      participants: challenge.participations
        ? challenge.participations.length
        : 0,
      comments: challenge.comments ? challenge.comments.length : 0,
    }));

    // Top participants (par nombre de participations)
    const rawTopParticipants = await ChallengeParticipation.findAll({
      attributes: [
        'user_id',
        [fn('COUNT', col('ChallengeParticipation.id')), 'participationsCount'],
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [{ model: City, as: 'city', attributes: ['name'] }],
        },
      ],
      group: ['user_id', 'user.id', 'user->city.id'],
      order: [[fn('COUNT', col('ChallengeParticipation.id')), 'DESC']],
      limit: 3,
    });

    const topParticipants = rawTopParticipants
      .filter((row) => row.user)
      .map((row, index) => ({
        rank: index + 1,
        name: row.user.username,
        location: row.user.city ? row.user.city.name : 'Non renseigné',
        points: `${row.get('participationsCount')} participations`,
      }));

    return res.status(200).json({
      success: true,
      message: 'Statistiques du dashboard',
      data: {
        counters: {
          activeChallenges,
          participants: totalParticipants,
          comments: totalComments,
          participationRate,
        },
        latestChallenges,
        topParticipants,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des stats du dashboard :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      data: null,
    });
  }
};


