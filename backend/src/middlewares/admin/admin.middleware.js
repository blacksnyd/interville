const { Role } = require('../../models');

module.exports = async (req, res, next) => {
  try {

    const role = await Role.findOne({ where: { id: req.user.role } });
    if (!role || role.name !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Vous devez être administrateur"
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};