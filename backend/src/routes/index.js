const { Router } = require('express');

const router =  Router();

router.use('/auth', require('./auth.routes'));
router.use('/admin', require('./admin.routes'));
router.use('/cities', require('./cities.routes'));
router.use('/classes', require('./classes.routes'));

module.exports = router;
