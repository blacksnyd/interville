const { Router } = require('express');
const router =  Router();

const authController = require('../controllers/auth.controller');

router.post('/login', authController.register)

module.exports = router;
