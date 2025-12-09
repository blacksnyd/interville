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
  const token = req.query.token;

  console.log("TOKEN REÇU :", token);

  if (!token) {
    return res.status(400).json({ message: 'Token manquant.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: 'Déjà vérifié.' });
    }

    user.is_verified = true

    await user.save();

    res.json({ message: 'Email vérifié avec succès.' });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Token invalide ou expiré.' });
  }
};
