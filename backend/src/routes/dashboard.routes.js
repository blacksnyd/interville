const { Router } = require('express');
const router = Router();

const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/auth');

// Dashboard stats protégées par authentification
router.get('/stats', authMiddleware, dashboardController.stats);

module.exports = router;


