const { Router } = require('express');
const router =  Router();

const authenticate = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/test', authenticate, admin,(req,res) => {
  res.send("page admin");
})

module.exports = router;
