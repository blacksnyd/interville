const { User } = require('../models');
const bcrypt = require('bcrypt');


async function register({username, password, email, city, class: userClass}) {
  const hash = await bcrypt.hash(password, 10);
  console.log(username, password, email, city, userClass);
  const user = await User.create({
    username,
    password: hash,
    email,
    city_id:  parseInt(city),
    class_id: parseInt(userClass),
  });
  return user;
}

module.exports = {register};
