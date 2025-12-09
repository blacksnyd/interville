const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "aucun token trouvé",
      data: null
    })
  }

  const token = authorization.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN)
    console.log(payload);
    req.user = payload;
    return next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "token invalide",
      data: null
    })
  }
}
