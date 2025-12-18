const { Router } = require('express');
const router = Router();

const challengesController = require('../controllers/challenges.controller');
const authMiddleware = require('../middlewares/auth');

// Toutes les routes challenges sont protégées par l'authentification
router.get('/', authMiddleware, challengesController.list);
router.get('/mine', authMiddleware, challengesController.mine);
router.get('/participations', authMiddleware, challengesController.participations);
router.get('/:id', authMiddleware, challengesController.getOne);
router.post('/', authMiddleware, challengesController.create);
router.post('/:id/participate', authMiddleware, challengesController.participate);
router.post('/:id/comments', authMiddleware, challengesController.comment);

module.exports = router;


