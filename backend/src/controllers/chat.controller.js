'use strict';

const { ChatMessage, User, City } = require('../models');

/**
 * Récupérer les derniers messages de chat
 */
exports.list = async (req, res) => {
  try {
    const messages = await ChatMessage.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [
            {
              model: City,
              as: 'city',
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['created_at', 'DESC']],
      limit: 50,
    });

    // On renvoie dans l'ordre chronologique
    const formatted = messages
      .reverse()
      .map((msg) => ({
        id: msg.id,
        content: msg.content,
        created_at: msg.created_at,
        user: msg.user
          ? {
              id: msg.user.id,
              username: msg.user.username,
              city: msg.user.city ? msg.user.city.name : null,
            }
          : null,
      }));

    return res.status(200).json({
      success: true,
      message: 'Messages du chat',
      data: {
        messages: formatted,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des messages de chat :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      data: null,
    });
  }
};

/**
 * Envoyer un nouveau message dans le chat
 */
exports.create = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Le message ne peut pas être vide',
        data: null,
      });
    }

    const userId = req.user.sub;

    const message = await ChatMessage.create({
      user_id: userId,
      content: content.trim(),
    });

    const fullMessage = await ChatMessage.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [{ model: City, as: 'city', attributes: ['name'] }],
        },
      ],
    });

    const formatted = {
      id: fullMessage.id,
      content: fullMessage.content,
      created_at: fullMessage.created_at,
      user: fullMessage.user
        ? {
            id: fullMessage.user.id,
            username: fullMessage.user.username,
            city: fullMessage.user.city ? fullMessage.user.city.name : null,
          }
        : null,
    };

    return res.status(201).json({
      success: true,
      message: 'Message envoyé',
      data: formatted,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    return res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      data: null,
    });
  }
};


