const authService = require('../services/auth.service');
const {User} = require('../models');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    const user = result.user;
    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Email ou pseudo déjà pris",
        data: null
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

exports.login = async (req,res) => {
  try {
    const user = await authService.login(req.body)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect",
        data: null
      });
    }

    const token = authService.generateToken(user);

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: token
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

exports.protected = async (req,res) => {
  const user = await User.findByPk(req.user.sub);
  res.status(200).json({
    success: true,
    message: "test user data",
    data: user.toJSON()
  })
}
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token manquant.'
      });
    }

    const user = await authService.verifyEmail(token);

    return res.status(200).json({
      success: true,
      message: "Email vérifié avec succès",
      data: {
        id: user.id,
        email: user.email,
        is_verified: user.is_verified
      }
    });

  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'Token expiré.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        success: false,
        message: 'Token invalide.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erreur du serveur.'
    });
  }
};
