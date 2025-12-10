const { Router } = require('express');
const router =  Router();

const authenticate = require('../middlewares/auth');

router.get('/test', authenticate,(req,res) => {
  res.send("page admin");
})

module.exports = router;
