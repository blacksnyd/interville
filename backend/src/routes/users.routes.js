const { Router } = require('express');
const router =  Router();

const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin/admin.middleware');

router.get('/pending', authMiddleware, adminMiddleware, usersController.getPendingUsers);
router.patch('/:id/validate', authMiddleware, adminMiddleware, usersController.validation);

module.exports = router;
