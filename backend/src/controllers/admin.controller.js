const {User} = require('../models');
exports.all = async (req,res) => {
  const users = await User.findAll();
  console.log( )
}
exports.validation = async (req,res) => {
  try {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(!user) {
      res.status(400).json({
        success: false,
        message: "Aucun user ne correspond a cet id",
        data: null
      })
    }
  } catch (error) {

  }
}
