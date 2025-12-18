const { Router } = require('express');

const router =  Router();

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./users.routes'));
router.use('/cities', require('./cities.routes'));
router.use('/classes', require('./classes.routes'));
router.use('/challenges', require('./challenges.routes'));
router.use('/chat', require('./chat.routes'));
router.use('/dashboard', require('./dashboard.routes'));

module.exports = router;
