const { Router } = require('express');
const router =  Router();

const authController = require('../controllers/auth.controller');
const {registerValidation, validateRegister} = require('../middlewares/validators/auth.validator');
const authMiddleware = require('../middlewares/auth');


router.post('/register', registerValidation, validateRegister, authController.register);
router.post('/login', authController.login);
router.get('/protected', authMiddleware, authController.protected);
router.get('/verify-email', authController.verifyEmail)

module.exports = router;
