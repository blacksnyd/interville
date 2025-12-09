const { body, validationResult } = require('express-validator');

exports.registerValidation = [
  body('username')
    .notEmpty().withMessage("Le nom d'utilisateur est requis"),
  body('password')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  body('email')
    .isEmail().withMessage('Email invalide')
    .custom(email => {
      if (!email.endsWith('@laplateforme.io')) {
        throw new Error('Seuls les emails @laplateforme.io sont autorisés');
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
