const { User } = require("../models");

async function validationUser(id) {
  const user = await User.findByPk(id);

  user.is_validated = true;
  await user.save();

  return user;
}

module.exports = { validationUser };
