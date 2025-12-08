const { Router } = require('express');
const router =  Router();

const authController = require('../controllers/auth.controller');
const {registerRules} = require('../middlewares/validators/auth.validator');


router.post('/register', registerRules, authController.register)

module.exports = router;
