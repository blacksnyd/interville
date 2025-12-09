const jwt = require('jsonwebtoken');

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

}
