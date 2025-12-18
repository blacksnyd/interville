const {User} = require('../models');
const adminService = require('../services/users.service');

exports.getPendingUsers = async (req, res) => {
  try {
    const users = await adminService.getPendingUsers();

    return res.status(200).json({
      success: true,
      message: "Utilisateurs en attente de validation",
      data: {
        users: users.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          location: user.city ? user.city.name : null,
          promo: user.class ? user.class.name : null,
          requestDate: user.created_at
        }))
      }
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};

exports.validation = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Aucun utilisateur ne correspond à cet ID",
        data: null
      });
    }

    if (user.is_validated) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur déjà validé",
        data: null
      });
    }

    const validatedUser = await adminService.validationUser(id);

    return res.status(200).json({
      success: true,
      message: "Utilisateur validé avec succès",
      data: {
        id: validatedUser.id,
        username: validatedUser.username,
        email: validatedUser.email,
        is_validated: validatedUser.is_validated
      }
    });

  } catch (error) {
    console.error("Erreur lors de la validation :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
      error: error.message
    });
  }
};
