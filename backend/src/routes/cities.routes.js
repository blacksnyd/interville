const {Router} = require('express');
const router = Router();

const citiesController = require('../controllers/cities.controller');

router.get('/all', citiesController.all);

module.exports = router;
