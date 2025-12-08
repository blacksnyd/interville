const { Router } = require('express');
const router =  Router();

const authController = require('../controllers/auth.controller');
const {registerValidation} = require('../middlewares/validators/auth.validator');


router.post('/register', registerValidation, authController.register)

module.exports = router;
