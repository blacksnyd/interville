const { User } = require('../models');
const bcrypt = require('bcrypt');
const {registerValidation} = require('../middlewares/validators/auth.validator');

exports.register = async (req, res) => {
  const errors = registerValidation(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }
  try {
    const { username, password, email, city, class: userClass } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hash,
      email,
      city_id:  parseInt(city),
      class_id: parseInt(userClass),
    });



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
