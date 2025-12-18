'use strict';

const { Op } = require('sequelize');
const {
  Challenge,
  ChallengeParticipation,
  ChallengeComment,
  User,
  City
} = require('../models');

/**
 * Liste des challenges avec filtres optionnels
 */
exports.list = async (req, res) => {
  try {
    const { search, category } = req.query;

    const where = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const challenges = await Challenge.findAll({
      where,
      include: [
        { model: User, as: 'creator', attributes: ['id', 'username'] },
        { model: City, as: 'city', attributes: ['id', 'name'] },
        { model: ChallengeParticipation, as: 'participations', attributes: ['id'] },
        { model: ChallengeComment, as: 'comments', attributes: ['id'] }
      ],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Liste des challenges',
      data: {
        challenges: challenges.map((challenge) => ({
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          category: challenge.category,
          status: challenge.status,
          location: challenge.city ? challenge.city.name : null,
          author: challenge.creator ? challenge.creator.username : null,
          participants: challenge.participations ? challenge.participations.length : 0,
          comments: challenge.comments ? challenge.comments.length : 0,
          created_at: challenge.created_at
        }))
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des challenges :', error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};

/**
 * Détail d'un challenge
 */
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const challenge = await Challenge.findByPk(id, {
      include: [
        { model: User, as: 'creator', attributes: ['id', 'username'] },
        { model: City, as: 'city', attributes: ['id', 'name'] },
        {
          model: ChallengeParticipation,
          as: 'participations',
          include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
        },
        {
          model: ChallengeComment,
          as: 'comments',
          include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
        }
      ]
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge introuvable',
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Détail du challenge',
      data: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        category: challenge.category,
        status: challenge.status,
        location: challenge.city ? challenge.city.name : null,
        author: challenge.creator ? challenge.creator.username : null,
        created_at: challenge.created_at,
        participants: challenge.participations
          ? challenge.participations.length
          : 0,
        commentsCount: challenge.comments ? challenge.comments.length : 0,
        comments: challenge.comments
          ? challenge.comments.map((comment) => ({
              id: comment.id,
              content: comment.content,
              author: comment.user ? comment.user.username : null,
              created_at: comment.created_at
            }))
          : []
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du challenge :', error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};

/**
 * Création d'un challenge
 */
exports.create = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Titre, description et catégorie sont obligatoires',
        data: null
      });
    }

    const creatorId = req.user.sub;

    const challenge = await Challenge.create({
      title,
      description,
      category,
      creator_id: creatorId,
      // On associe le challenge à la ville de l'utilisateur plus tard si besoin
    });

    return res.status(201).json({
      success: true,
      message: 'Challenge créé avec succès',
      data: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        category: challenge.category,
        status: challenge.status
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création du challenge :', error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};

/**
 * Participation à un challenge
 */
exports.participate = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;

    const challenge = await Challenge.findByPk(id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge introuvable',
        data: null
      });
    }

    const [participation, created] = await ChallengeParticipation.findOrCreate({
      where: {
        user_id: userId,
        challenge_id: challenge.id
      }
    });

    return res.status(200).json({
      success: true,
      message: created
        ? 'Participation enregistrée'
        : 'Vous participez déjà à ce challenge',
      data: {
        id: participation.id,
        user_id: participation.user_id,
        challenge_id: participation.challenge_id
      }
    });
  } catch (error) {
    console.error('Erreur lors de la participation :', error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};

/**
 * Ajout d'un commentaire sur un challenge
 */
exports.comment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.sub;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Le contenu du commentaire est obligatoire',
        data: null
      });
    }

    const challenge = await Challenge.findByPk(id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge introuvable',
        data: null
      });
    }

    const comment = await ChallengeComment.create({
      user_id: userId,
      challenge_id: challenge.id,
      content
    });

    return res.status(201).json({
      success: true,
      message: 'Commentaire ajouté',
      data: {
        id: comment.id,
        content: comment.content,
        user_id: comment.user_id,
        challenge_id: comment.challenge_id,
        created_at: comment.created_at
      }
    });
  } catch (error) {
    console.error('Erreur lors de l’ajout du commentaire :', error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};

/**
 * Challenges créés par l'utilisateur connecté
 */
exports.mine = async (req, res) => {
  try {
    const userId = req.user.sub;

    const challenges = await Challenge.findAll({
      where: { creator_id: userId },
      include: [
        { model: City, as: 'city', attributes: ['id', 'name'] },
        { model: ChallengeParticipation, as: 'participations', attributes: ['id'] },
        { model: ChallengeComment, as: 'comments', attributes: ['id'] }
      ],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Challenges créés par l’utilisateur',
      data: {
        challenges: challenges.map((challenge) => ({
          id: challenge.id,
          title: challenge.title,
          category: challenge.category,
          location: challenge.city ? challenge.city.name : null,
          participants: challenge.participations
            ? challenge.participations.length
            : 0,
          comments: challenge.comments ? challenge.comments.length : 0
        }))
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des challenges de l’utilisateur :', error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};

/**
 * Challenges auxquels l'utilisateur participe
 */
exports.participations = async (req, res) => {
  try {
    const userId = req.user.sub;

    const participations = await ChallengeParticipation.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Challenge,
          as: 'challenge',
          include: [
            { model: User, as: 'creator', attributes: ['id', 'username'] },
            { model: City, as: 'city', attributes: ['id', 'name'] }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Challenges auxquels participe l’utilisateur',
      data: {
        challenges: participations
          .filter((p) => p.challenge)
          .map((p) => ({
            id: p.challenge.id,
            title: p.challenge.title,
            category: p.challenge.category,
            author: p.challenge.creator ? p.challenge.creator.username : null,
            location: p.challenge.city ? p.challenge.city.name : null
          }))
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des participations :', error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};


