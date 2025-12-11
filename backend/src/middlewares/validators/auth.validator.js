const { body, validationResult } = require('express-validator');
const { Class, City } = require('../../models');

exports.registerValidation = [
  body('username')
    .notEmpty().withMessage("Le nom d'utilisateur est requis"),

  body('password')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),

  body('email')
    .isEmail().withMessage('Email invalide')
    .bail()
    .custom(email => {
      if (!email.endsWith('@laplateforme.io')) {
        throw new Error('Seuls les emails @laplateforme.io sont autorisés');
      }
      return true;
    }),

  body('city')
    .notEmpty().withMessage("La ville est requis")
    .bail()
    .isInt().withMessage('l\'ID doit être un entier')
    .bail()
    .toInt()
    .custom(async (value) => {
      const city = await City.findByPk(value);
      if (!city) {
        throw new Error("Cette ville n'existe pas");
      }
      return true;
    }),

  body('class')
    .notEmpty().withMessage("La promo est requis")
    .bail()
    .isInt().withMessage('l\'ID doit être un entier')
    .bail()
    .toInt()
    .custom(async (value) => {
      const classItem = await Class.findByPk(value);
      if (!classItem) {
        throw new Error("Cette classe n'existe pas");
      }
      return true;
    })
];

exports.validateRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};


exports.loginValidation = [
  body('email')
    .notEmpty().withMessage("L'email est requis")
    .bail()
    .isEmail().withMessage("Format d'email invalide")
    .bail()
    .custom(email => {
      if (!email.endsWith('@laplateforme.io')) {
        throw new Error('Seuls les emails @laplateforme.io sont autorisés');
      }
      return true;
    }),

  body('password')
    .notEmpty().withMessage("Le mot de passe est requis")
    .bail()
    .isLength({ min: 6 }).withMessage("Le mot de passe doit faire au moins 6 caractères")
];

exports.validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};
