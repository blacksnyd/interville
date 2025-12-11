const {Router} = require('express');
const router = Router();

const classesController = require('../controllers/classes.controller');

router.get('/all', classesController.all);

module.exports = router;
