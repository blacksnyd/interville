const { User, City, Class } = require("../models");

async function validationUser(id) {
  const user = await User.findByPk(id);

  user.is_validated = true;
  await user.save();

  return user;
}

async function getPendingUsers() {
  const users = await User.findAll({
    where: {
      is_validated: false
    },
    include: [
      { model: City, as: 'city' },
      { model: Class, as: 'class' }
    ],
    order: [['created_at', 'DESC']]
  });

  return users;
}

module.exports = { validationUser, getPendingUsers };
