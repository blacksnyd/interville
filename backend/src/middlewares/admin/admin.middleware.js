//  vérifie si l'utilisateur est admin
module.exports = (req, res, next) => {
  // req.user doit être défini par un middleware d'authentification précédent
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Accès réservé aux administrateurs."
    });
  }
  next();
};