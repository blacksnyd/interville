// je vérifie si l'utilisateur envoie trop de requêtes en peu de temps
const userAction = {};
// on autorise une requête toutes les 3 secondes
module.exports = (req, res, next) => {
  const userId = req.user ? req.user.id : req.ip;
  const now = Date.now();
  if (userAction[userId] && now - userAction[userId] < 3000) {
    return res.status(429).json({
      success: false,
      message: "Trop de requêtes, veuillez patienter."
    });
  }
  userAction[userId] = now;
  next();
};