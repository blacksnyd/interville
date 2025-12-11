const {User} = require('../models');
const adminService = require('../services/admin.service');

exports.all = async (req,res) => {
  const users = await User.findAll();
  console.log( )
}
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
