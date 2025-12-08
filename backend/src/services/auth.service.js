const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



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

function generateToken(user) {
  return jwt.sign(
    {sub: user.id},
    process.env.JWT_TOKEN,
    {expiresIn: '3h'}
  )
}

module.exports = {register, generateToken};
