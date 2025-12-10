const {Role} = require('../models');
module.exports = async (req,res,next) => {
  const role = await Role.findOne({where: {id: req.user.role}});
  if (role.name !== "admin" ) {
    return res.status(401).json({
      success: false,
      message: "Vous devez être administrateur"
    })
  }
  next();
}
