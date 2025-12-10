const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
  }
});

async function register({ username, password, email, city, class: userClass }) {
  const hash = await bcrypt.hash(password, 10);
  console.log(username, password, email, city, userClass);
  const user = await User.create({
    username,
    password: hash,
    email,
    city_id: parseInt(city, 10),
    class_id: parseInt(userClass, 10),
  });

  const emailToken = jwt.sign(
    { email: user.email },
    process.env.JWT_TOKEN,
    { expiresIn: '2m' }
  );

  console.log("TOKEN ATTENDU :", emailToken);


  const verificationUrl = `http://localhost:5000/api/auth/verify-email?token=${emailToken}`;

  const mailOptions = {
    from: "kenzodouchet33@gmail.com",
    to: user.email,
    subject: 'Verify Your Email',
    html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
  };

  await emailTransporter.sendMail(mailOptions);

  return { user, verificationUrl };
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });

  if (!user) return null;

  const logged = await bcrypt.compare(password, user.password);

  return logged ? user : null;
}

function generateToken(user) {
  return jwt.sign(
    { sub: user.id },
    process.env.JWT_TOKEN,
    { expiresIn: '3h' }
  );
}

async function verificationEmail(token) {
  const payload = jwt.verify(token, process.env.JWT_TOKEN);

  const user = await User.findOne({ where: { email: payload.email } });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }
  if (user.is_verified) {
    return user;
  }

  user.is_verified = true;
  await user.save();

  return user;
}


module.exports = { register, login, generateToken, verificationEmail };
