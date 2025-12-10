const { Router } = require('express');
const router =  Router();

const adminController = require('../controllers/admin.controller');

const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

router.get('/users', authMiddleware, adminMiddleware, adminController.all);
router.patch('/users/:id', authMiddleware, adminMiddleware, adminController.validation);

module.exports = router;
