const { Router } = require('express');
const router =  Router();

const authController = require('../controllers/auth.controller');
const {registerValidation, validateRegister} = require('../middlewares/validators/auth.validator');


router.post('/register', registerValidation, validateRegister, authController.register)
router.post('/login', authController.login)

module.exports = router;
