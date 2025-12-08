const {User} = require('../models');


exports.register = (req,res) => {
  const {username, password, email, city, class: userClass} = req.body;
  User.create({username, password, email, city, userClass});
}
