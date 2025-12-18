const { Router } = require('express');
const router = Router();

const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middlewares/auth');

// Routes de chat protégées par l'authentification
router.get('/', authMiddleware, chatController.list);
router.post('/', authMiddleware, chatController.create);

module.exports = router;


