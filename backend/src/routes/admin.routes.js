const { Router } = require('express');
const router =  Router();

const adminController = require('../controllers/admin.controller');

const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin/admin.middleware');

router.patch('/users/:id', authMiddleware, adminMiddleware, adminController.validation);

module.exports = router;
